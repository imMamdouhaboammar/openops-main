"""
State Manager - مدير الحالة
=============================
إدارة حالة النظام والوكلاء بشكل موحد ومتسق
"""

import time
from typing import Dict, List, Any, Optional, Set
from dataclasses import dataclass, field
from enum import Enum
import asyncio
from collections import defaultdict
import json


class StateUpdateMode(Enum):
    """أنماط تحديث الحالة"""
    REPLACE = "replace"  # استبدال كامل
    MERGE = "merge"      # دمج
    APPEND = "append"    # إضافة
    UPDATE = "update"    # تحديث


@dataclass
class StateSnapshot:
    """لقطة من حالة النظام في نقطة زمنية"""
    snapshot_id: str
    timestamp: float
    state_data: Dict[str, Any]
    metadata: Dict[str, Any] = field(default_factory=dict)


class StateManager:
    """
    مدير الحالة المركزي للنظام
    
    Features:
    - إدارة حالة متعددة الوكلاء
    - دعم العمليات المتوازية
    - تتبع التغييرات
    - إمكانية العودة للحالات السابقة (Rollback)
    - التخزين المؤقت
    """
    
    def __init__(self, enable_history: bool = True, max_history: int = 100):
        self.enable_history = enable_history
        self.max_history = max_history
        
        # الحالة الحالية
        self._state: Dict[str, Any] = {}
        
        # قفل للعمليات المتزامنة
        self._lock = asyncio.Lock()
        
        # سجل التغييرات
        self._history: List[StateSnapshot] = []
        
        # المشتركون في تغييرات الحالة
        self._subscribers: Dict[str, List[callable]] = defaultdict(list)
        
        # إحصائيات
        self._stats = {
            "total_updates": 0,
            "total_reads": 0,
            "total_rollbacks": 0
        }
    
    async def get(self, key: str, default: Any = None) -> Any:
        """الحصول على قيمة من الحالة"""
        async with self._lock:
            self._stats["total_reads"] += 1
            return self._state.get(key, default)
    
    async def get_all(self) -> Dict[str, Any]:
        """الحصول على كل الحالة"""
        async with self._lock:
            self._stats["total_reads"] += 1
            return self._state.copy()
    
    async def set(
        self,
        key: str,
        value: Any,
        mode: StateUpdateMode = StateUpdateMode.REPLACE,
        notify: bool = True
    ):
        """تعيين قيمة في الحالة"""
        async with self._lock:
            # حفظ الحالة السابقة للتاريخ
            if self.enable_history:
                await self._save_snapshot()
            
            # تطبيق التحديث حسب النمط
            if mode == StateUpdateMode.REPLACE:
                self._state[key] = value
            elif mode == StateUpdateMode.MERGE and isinstance(value, dict):
                if key not in self._state or not isinstance(self._state[key], dict):
                    self._state[key] = {}
                self._state[key].update(value)
            elif mode == StateUpdateMode.APPEND and isinstance(value, (list, tuple)):
                if key not in self._state:
                    self._state[key] = []
                self._state[key].extend(value)
            elif mode == StateUpdateMode.UPDATE:
                if key in self._state and isinstance(self._state[key], dict) and isinstance(value, dict):
                    self._state[key].update(value)
                else:
                    self._state[key] = value
            
            self._stats["total_updates"] += 1
            
            # إشعار المشتركين
            if notify:
                await self._notify_subscribers(key, value)
    
    async def update_batch(self, updates: Dict[str, Any], mode: StateUpdateMode = StateUpdateMode.REPLACE):
        """تحديث دفعة من القيم"""
        async with self._lock:
            if self.enable_history:
                await self._save_snapshot()
            
            for key, value in updates.items():
                if mode == StateUpdateMode.REPLACE:
                    self._state[key] = value
                elif mode == StateUpdateMode.MERGE and isinstance(value, dict):
                    if key not in self._state:
                        self._state[key] = {}
                    self._state[key].update(value)
                elif mode == StateUpdateMode.APPEND and isinstance(value, list):
                    if key not in self._state:
                        self._state[key] = []
                    self._state[key].extend(value)
            
            self._stats["total_updates"] += len(updates)
            
            # إشعار المشتركين لكل مفتاح
            for key, value in updates.items():
                await self._notify_subscribers(key, value)
    
    async def delete(self, key: str):
        """حذف قيمة من الحالة"""
        async with self._lock:
            if self.enable_history:
                await self._save_snapshot()
            
            if key in self._state:
                del self._state[key]
                self._stats["total_updates"] += 1
    
    async def clear(self):
        """مسح كل الحالة"""
        async with self._lock:
            if self.enable_history:
                await self._save_snapshot()
            
            self._state.clear()
            self._stats["total_updates"] += 1
    
    async def _save_snapshot(self):
        """حفظ لقطة من الحالة الحالية"""
        snapshot = StateSnapshot(
            snapshot_id=f"snapshot_{len(self._history)}",
            timestamp=time.time(),
            state_data=self._state.copy()
        )
        
        self._history.append(snapshot)
        
        # الحد من حجم التاريخ
        if len(self._history) > self.max_history:
            self._history.pop(0)
    
    async def rollback(self, steps: int = 1) -> bool:
        """العودة لحالة سابقة"""
        async with self._lock:
            if not self.enable_history or len(self._history) < steps:
                return False
            
            # العودة للحالة المطلوبة
            target_snapshot = self._history[-(steps + 1)]
            self._state = target_snapshot.state_data.copy()
            
            # إزالة اللقطات الأحدث
            self._history = self._history[:-(steps)]
            
            self._stats["total_rollbacks"] += 1
            return True
    
    async def get_history(self, limit: Optional[int] = None) -> List[StateSnapshot]:
        """الحصول على سجل التغييرات"""
        async with self._lock:
            if limit:
                return self._history[-limit:]
            return self._history.copy()
    
    def subscribe(self, key: str, callback: callable):
        """الاشتراك في تغييرات مفتاح معين"""
        self._subscribers[key].append(callback)
    
    def unsubscribe(self, key: str, callback: callable):
        """إلغاء الاشتراك"""
        if key in self._subscribers:
            self._subscribers[key].remove(callback)
    
    async def _notify_subscribers(self, key: str, value: Any):
        """إشعار المشتركين بالتغييرات"""
        if key in self._subscribers:
            for callback in self._subscribers[key]:
                try:
                    if asyncio.iscoroutinefunction(callback):
                        await callback(key, value)
                    else:
                        callback(key, value)
                except Exception as e:
                    print(f"Error in subscriber callback: {e}")
    
    def get_stats(self) -> Dict[str, Any]:
        """الحصول على إحصائيات الاستخدام"""
        return {
            **self._stats,
            "state_keys": len(self._state),
            "history_size": len(self._history),
            "subscribers": sum(len(subs) for subs in self._subscribers.values())
        }
    
    async def export_state(self, format: str = "json") -> str:
        """تصدير الحالة"""
        async with self._lock:
            if format == "json":
                return json.dumps(self._state, indent=2, default=str)
            else:
                return str(self._state)
    
    async def import_state(self, state_data: Dict[str, Any], merge: bool = False):
        """استيراد حالة"""
        async with self._lock:
            if self.enable_history:
                await self._save_snapshot()
            
            if merge:
                self._state.update(state_data)
            else:
                self._state = state_data.copy()
            
            self._stats["total_updates"] += 1


class AgentStateManager(StateManager):
    """
    مدير حالة مخصص للوكلاء - يوفر وظائف إضافية
    """
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._agent_states: Dict[str, Dict[str, Any]] = {}
    
    async def register_agent(self, agent_id: str, initial_state: Optional[Dict] = None):
        """تسجيل وكيل جديد"""
        async with self._lock:
            self._agent_states[agent_id] = initial_state or {}
    
    async def update_agent_state(self, agent_id: str, state_updates: Dict[str, Any]):
        """تحديث حالة وكيل"""
        async with self._lock:
            if agent_id not in self._agent_states:
                self._agent_states[agent_id] = {}
            
            self._agent_states[agent_id].update(state_updates)
            
            # تحديث الحالة العامة
            await self.set(f"agent_{agent_id}", self._agent_states[agent_id])
    
    async def get_agent_state(self, agent_id: str) -> Dict[str, Any]:
        """الحصول على حالة وكيل"""
        async with self._lock:
            return self._agent_states.get(agent_id, {}).copy()
    
    async def get_all_agents(self) -> List[str]:
        """الحصول على قائمة بكل الوكلاء المسجلين"""
        async with self._lock:
            return list(self._agent_states.keys())
    
    async def remove_agent(self, agent_id: str):
        """إزالة وكيل"""
        async with self._lock:
            if agent_id in self._agent_states:
                del self._agent_states[agent_id]
                await self.delete(f"agent_{agent_id}")


# مثال على الاستخدام
if __name__ == "__main__":
    async def main():
        # إنشاء مدير الحالة
        state_manager = StateManager(enable_history=True)
        
        # تعيين قيم
        await state_manager.set("key1", "value1")
        await state_manager.set("key2", {"nested": "data"})
        
        # الحصول على قيم
        value = await state_manager.get("key1")
        print(f"key1: {value}")
        
        # تحديث دفعة
        await state_manager.update_batch({
            "key3": [1, 2, 3],
            "key4": {"test": True}
        })
        
        # طباعة كل الحالة
        all_state = await state_manager.get_all()
        print(f"All state: {all_state}")
        
        # الإحصائيات
        print(f"Stats: {state_manager.get_stats()}")
    
    asyncio.run(main())
