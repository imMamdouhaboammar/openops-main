"""
Base Agent Class - الوكيل الأساسي
====================================
الوكيل الأساسي الذي ترث منه كل الوكلاء الأخرى في النظام
"""

import time
import uuid
from typing import Dict, List, Any, Optional, Callable
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import Enum
import asyncio


class AgentRole(Enum):
    """أدوار الوكلاء المختلفة"""
    PLANNER = "planner"
    WORKER = "worker"
    JUDGE = "judge"
    RETRIEVAL = "retrieval"
    CREATIVE = "creative"
    MANAGER = "manager"


class AgentStatus(Enum):
    """حالات الوكيل"""
    IDLE = "idle"
    THINKING = "thinking"
    EXECUTING = "executing"
    COMPLETED = "completed"
    FAILED = "failed"


@dataclass
class AgentMessage:
    """رسالة بين الوكلاء"""
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    sender_id: str = ""
    receiver_id: str = ""
    content: Any = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    timestamp: float = field(default_factory=time.time)


@dataclass
class AgentResult:
    """نتيجة تنفيذ الوكيل"""
    agent_id: str
    output: Any
    success: bool = True
    error: Optional[str] = None
    execution_time: float = 0.0
    metadata: Dict[str, Any] = field(default_factory=dict)
    timestamp: float = field(default_factory=time.time)


class BaseAgent(ABC):
    """
    الوكيل الأساسي - يوفر الوظائف الأساسية لكل الوكلاء
    
    Features:
    - تتبع الأداء
    - إدارة الحالة
    - التواصل بين الوكلاء
    - معالجة الأخطاء
    """
    
    def __init__(
        self,
        agent_id: Optional[str] = None,
        role: AgentRole = AgentRole.WORKER,
        config: Optional[Dict[str, Any]] = None
    ):
        self.agent_id = agent_id or str(uuid.uuid4())
        self.role = role
        self.config = config or {}
        self.status = AgentStatus.IDLE
        
        # Performance tracking
        self.execution_count = 0
        self.total_execution_time = 0.0
        self.success_count = 0
        self.failure_count = 0
        
        # Message queue
        self.message_queue: List[AgentMessage] = []
        
        # Callbacks
        self.on_start: Optional[Callable] = None
        self.on_complete: Optional[Callable] = None
        self.on_error: Optional[Callable] = None
    
    @abstractmethod
    async def process(self, input_data: Any) -> AgentResult:
        """
        معالجة المدخلات وإنتاج النتائج
        يجب تنفيذها في كل وكيل
        """
        pass
    
    async def execute(self, input_data: Any) -> AgentResult:
        """
        تنفيذ الوكيل مع تتبع الأداء ومعالجة الأخطاء
        """
        self.status = AgentStatus.EXECUTING
        start_time = time.time()
        
        try:
            # Callback: on_start
            if self.on_start:
                await self.on_start(self.agent_id, input_data)
            
            # معالجة فعلية
            result = await self.process(input_data)
            
            # تحديث الإحصائيات
            execution_time = time.time() - start_time
            result.execution_time = execution_time
            
            self.execution_count += 1
            self.total_execution_time += execution_time
            
            if result.success:
                self.success_count += 1
                self.status = AgentStatus.COMPLETED
            else:
                self.failure_count += 1
                self.status = AgentStatus.FAILED
            
            # Callback: on_complete
            if self.on_complete:
                await self.on_complete(self.agent_id, result)
            
            return result
            
        except Exception as e:
            execution_time = time.time() - start_time
            self.failure_count += 1
            self.status = AgentStatus.FAILED
            
            error_result = AgentResult(
                agent_id=self.agent_id,
                output=None,
                success=False,
                error=str(e),
                execution_time=execution_time
            )
            
            # Callback: on_error
            if self.on_error:
                await self.on_error(self.agent_id, e)
            
            return error_result
    
    async def send_message(self, receiver_id: str, content: Any, metadata: Optional[Dict] = None):
        """إرسال رسالة لوكيل آخر"""
        message = AgentMessage(
            sender_id=self.agent_id,
            receiver_id=receiver_id,
            content=content,
            metadata=metadata or {}
        )
        return message
    
    async def receive_message(self, message: AgentMessage):
        """استقبال رسالة من وكيل آخر"""
        self.message_queue.append(message)
    
    def get_performance_stats(self) -> Dict[str, Any]:
        """الحصول على إحصائيات الأداء"""
        avg_execution_time = (
            self.total_execution_time / self.execution_count
            if self.execution_count > 0
            else 0.0
        )
        
        success_rate = (
            self.success_count / self.execution_count
            if self.execution_count > 0
            else 0.0
        )
        
        return {
            "agent_id": self.agent_id,
            "role": self.role.value,
            "status": self.status.value,
            "execution_count": self.execution_count,
            "success_count": self.success_count,
            "failure_count": self.failure_count,
            "success_rate": success_rate,
            "total_execution_time": self.total_execution_time,
            "avg_execution_time": avg_execution_time
        }
    
    def reset_stats(self):
        """إعادة تعيين الإحصائيات"""
        self.execution_count = 0
        self.total_execution_time = 0.0
        self.success_count = 0
        self.failure_count = 0
        self.status = AgentStatus.IDLE
    
    def __repr__(self) -> str:
        return f"<{self.__class__.__name__}(id={self.agent_id[:8]}, role={self.role.value})>"


class PlannerAgent(BaseAgent):
    """وكيل المخطط - يقوم بتقسيم المهام إلى مهام فرعية"""
    
    def __init__(self, agent_id: Optional[str] = None, config: Optional[Dict] = None):
        super().__init__(agent_id=agent_id, role=AgentRole.PLANNER, config=config)
    
    async def process(self, input_data: Any) -> AgentResult:
        """توليد خطة تنفيذ متوازية"""
        # سيتم تنفيذها في الأنماط المختلفة
        await asyncio.sleep(0.1)  # محاكاة عملية التفكير
        
        return AgentResult(
            agent_id=self.agent_id,
            output={"plan": "generated_plan", "subtasks": []},
            success=True
        )


class WorkerAgent(BaseAgent):
    """وكيل العامل - ينفذ المهام المحددة"""
    
    def __init__(self, agent_id: Optional[str] = None, config: Optional[Dict] = None):
        super().__init__(agent_id=agent_id, role=AgentRole.WORKER, config=config)
    
    async def process(self, input_data: Any) -> AgentResult:
        """تنفيذ المهمة المحددة"""
        await asyncio.sleep(0.1)
        
        return AgentResult(
            agent_id=self.agent_id,
            output={"result": "task_completed"},
            success=True
        )


class JudgeAgent(BaseAgent):
    """وكيل الحكم - يقيم النتائج ويختار الأفضل"""
    
    def __init__(self, agent_id: Optional[str] = None, config: Optional[Dict] = None):
        super().__init__(agent_id=agent_id, role=AgentRole.JUDGE, config=config)
    
    async def process(self, input_data: Any) -> AgentResult:
        """تقييم واختيار الأفضل"""
        await asyncio.sleep(0.1)
        
        return AgentResult(
            agent_id=self.agent_id,
            output={"best_result": None, "critique": ""},
            success=True
        )


# مثال على الاستخدام
if __name__ == "__main__":
    async def main():
        # إنشاء وكيل
        agent = WorkerAgent()
        
        # تنفيذ مهمة
        result = await agent.execute({"task": "test"})
        
        print(f"Result: {result.output}")
        print(f"Execution time: {result.execution_time:.3f}s")
        print(f"Stats: {agent.get_performance_stats()}")
    
    asyncio.run(main())
