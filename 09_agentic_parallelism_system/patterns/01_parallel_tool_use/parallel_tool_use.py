"""
Pattern 1: Parallel Tool Use - استخدام الأدوات المتوازية
=========================================================
إخفاء تأخير I/O من خلال تنفيذ استدعاءات API المستقلة بشكل متوازٍ

Performance Gain: 30-70% latency reduction
Use Cases:
- Fetching data from multiple APIs
- Parallel database queries
- Simultaneous external service calls
"""

import asyncio
import time
from typing import List, Dict, Any, Callable, Optional
from dataclasses import dataclass
from abc import ABC, abstractmethod
import sys
sys.path.append('../core')

from base_agent import BaseAgent, AgentResult
from performance_tracker import PerformanceTracker


@dataclass
class ToolCall:
    """تعريف استدعاء أداة"""
    tool_name: str
    parameters: Dict[str, Any]
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class ToolResult:
    """نتيجة استدعاء أداة"""
    tool_name: str
    result: Any
    success: bool = True
    error: Optional[str] = None
    execution_time: float = 0.0


class Tool(ABC):
    """واجهة الأداة الأساسية"""
    
    def __init__(self, name: str, description: str = ""):
        self.name = name
        self.description = description
    
    @abstractmethod
    async def execute(self, **kwargs) -> Any:
        """تنفيذ الأداة"""
        pass
    
    def __repr__(self) -> str:
        return f"<Tool(name={self.name})>"


class ParallelToolExecutor:
    """
    منفذ الأدوات المتوازي
    
    Features:
    - تنفيذ متوازٍ لاستدعاءات API المستقلة
    - تتبع الأداء
    - معالجة الأخطاء
    - التخزين المؤقت
    """
    
    def __init__(
        self,
        tools: Optional[Dict[str, Tool]] = None,
        max_parallel: int = 10,
        timeout: float = 30.0,
        enable_caching: bool = True,
        cache_ttl: float = 3600.0
    ):
        self.tools = tools or {}
        self.max_parallel = max_parallel
        self.timeout = timeout
        self.enable_caching = enable_caching
        self.cache_ttl = cache_ttl
        
        # Cache
        self._cache: Dict[str, tuple] = {}  # key -> (result, timestamp)
        
        # Performance tracker
        self.perf_tracker = PerformanceTracker()
    
    def register_tool(self, tool: Tool):
        """تسجيل أداة جديدة"""
        self.tools[tool.name] = tool
    
    def unregister_tool(self, tool_name: str):
        """إلغاء تسجيل أداة"""
        if tool_name in self.tools:
            del self.tools[tool_name]
    
    async def execute_parallel(
        self,
        tool_calls: List[ToolCall],
        fail_fast: bool = False
    ) -> List[ToolResult]:
        """
        تنفيذ عدة أدوات بشكل متوازٍ
        
        Args:
            tool_calls: قائمة استدعاءات الأدوات
            fail_fast: إيقاف التنفيذ عند أول خطأ
        
        Returns:
            قائمة نتائج الأدوات
        """
        self.perf_tracker.start_trace("parallel_execution")
        
        # إنشاء المهام
        tasks = []
        for tool_call in tool_calls:
            task = self._execute_single_tool(tool_call)
            tasks.append(task)
        
        # تنفيذ متوازٍ
        try:
            if fail_fast:
                results = await asyncio.gather(*tasks)
            else:
                # return_exceptions=True للاستمرار حتى عند الأخطاء
                results = await asyncio.gather(*tasks, return_exceptions=True)
                
                # معالجة الاستثناءات
                processed_results = []
                for i, result in enumerate(results):
                    if isinstance(result, Exception):
                        processed_results.append(
                            ToolResult(
                                tool_name=tool_calls[i].tool_name,
                                result=None,
                                success=False,
                                error=str(result)
                            )
                        )
                    else:
                        processed_results.append(result)
                
                results = processed_results
        
        except Exception as e:
            # في حالة fail_fast
            results = [
                ToolResult(
                    tool_name=tc.tool_name,
                    result=None,
                    success=False,
                    error=str(e)
                )
                for tc in tool_calls
            ]
        
        execution_time = self.perf_tracker.end_trace("parallel_execution")
        
        # تسجيل المقاييس
        for result in results:
            if result.success:
                self.perf_tracker.record_success()
            else:
                self.perf_tracker.record_failure()
        
        print(f"✅ Executed {len(tool_calls)} tools in parallel: {execution_time:.3f}s")
        
        return results
    
    async def execute_sequential(
        self,
        tool_calls: List[ToolCall]
    ) -> List[ToolResult]:
        """تنفيذ تسلسلي (للمقارنة)"""
        self.perf_tracker.start_trace("sequential_execution")
        
        results = []
        for tool_call in tool_calls:
            result = await self._execute_single_tool(tool_call)
            results.append(result)
        
        execution_time = self.perf_tracker.end_trace("sequential_execution")
        print(f"⏱️ Executed {len(tool_calls)} tools sequentially: {execution_time:.3f}s")
        
        return results
    
    async def _execute_single_tool(self, tool_call: ToolCall) -> ToolResult:
        """تنفيذ أداة واحدة"""
        tool_name = tool_call.tool_name
        
        # فحص الأداة
        if tool_name not in self.tools:
            return ToolResult(
                tool_name=tool_name,
                result=None,
                success=False,
                error=f"Tool '{tool_name}' not found"
            )
        
        # فحص الذاكرة المؤقتة
        if self.enable_caching:
            cache_key = self._get_cache_key(tool_call)
            cached_result = self._get_from_cache(cache_key)
            
            if cached_result is not None:
                print(f"💾 Cache hit for {tool_name}")
                return cached_result
        
        # تنفيذ الأداة
        start_time = time.time()
        
        try:
            tool = self.tools[tool_name]
            result = await asyncio.wait_for(
                tool.execute(**tool_call.parameters),
                timeout=self.timeout
            )
            
            execution_time = time.time() - start_time
            
            tool_result = ToolResult(
                tool_name=tool_name,
                result=result,
                success=True,
                execution_time=execution_time
            )
            
            # حفظ في الذاكرة المؤقتة
            if self.enable_caching:
                self._save_to_cache(cache_key, tool_result)
            
            print(f"🔧 [{tool_name}] Executed in {execution_time:.3f}s")
            
            return tool_result
        
        except asyncio.TimeoutError:
            execution_time = time.time() - start_time
            return ToolResult(
                tool_name=tool_name,
                result=None,
                success=False,
                error=f"Timeout after {self.timeout}s",
                execution_time=execution_time
            )
        
        except Exception as e:
            execution_time = time.time() - start_time
            return ToolResult(
                tool_name=tool_name,
                result=None,
                success=False,
                error=str(e),
                execution_time=execution_time
            )
    
    def _get_cache_key(self, tool_call: ToolCall) -> str:
        """توليد مفتاح الذاكرة المؤقتة"""
        import hashlib
        import json
        
        content = json.dumps({
            "tool": tool_call.tool_name,
            "params": tool_call.parameters
        }, sort_keys=True)
        
        return hashlib.md5(content.encode()).hexdigest()
    
    def _get_from_cache(self, cache_key: str) -> Optional[ToolResult]:
        """الحصول على نتيجة من الذاكرة المؤقتة"""
        if cache_key in self._cache:
            result, timestamp = self._cache[cache_key]
            
            # فحص الصلاحية
            if time.time() - timestamp < self.cache_ttl:
                return result
            else:
                # إزالة النتيجة المنتهية الصلاحية
                del self._cache[cache_key]
        
        return None
    
    def _save_to_cache(self, cache_key: str, result: ToolResult):
        """حفظ نتيجة في الذاكرة المؤقتة"""
        self._cache[cache_key] = (result, time.time())
    
    def clear_cache(self):
        """مسح الذاكرة المؤقتة"""
        self._cache.clear()
    
    def get_performance_stats(self) -> Dict[str, Any]:
        """الحصول على إحصائيات الأداء"""
        return self.perf_tracker.get_all_metrics()


# === أمثلة على الأدوات ===

class StockPriceTool(Tool):
    """أداة للحصول على سعر السهم"""
    
    def __init__(self):
        super().__init__(
            name="get_stock_price",
            description="Get the current stock price for a given symbol"
        )
    
    async def execute(self, symbol: str) -> Dict[str, Any]:
        """محاكاة استدعاء API"""
        # محاكاة تأخير الشبكة
        await asyncio.sleep(1.5)
        
        # محاكاة نتيجة
        import random
        price = round(random.uniform(100, 500), 2)
        
        return {
            "symbol": symbol,
            "price": price,
            "currency": "USD",
            "timestamp": time.time()
        }


class CompanyNewsTool(Tool):
    """أداة للحصول على أخبار الشركة"""
    
    def __init__(self):
        super().__init__(
            name="get_company_news",
            description="Get recent news articles for a company"
        )
    
    async def execute(self, company_name: str) -> Dict[str, Any]:
        """محاكاة استدعاء API للبحث"""
        # محاكاة تأخير الشبكة
        await asyncio.sleep(1.8)
        
        # محاكاة نتيجة
        articles = [
            {
                "title": f"Latest developments at {company_name}",
                "url": "https://example.com/news1",
                "published": "2025-12-19"
            },
            {
                "title": f"{company_name} announces new product",
                "url": "https://example.com/news2",
                "published": "2025-12-18"
            }
        ]
        
        return {
            "company": company_name,
            "articles": articles,
            "count": len(articles)
        }


class WeatherTool(Tool):
    """أداة للحصول على حالة الطقس"""
    
    def __init__(self):
        super().__init__(
            name="get_weather",
            description="Get current weather for a location"
        )
    
    async def execute(self, location: str) -> Dict[str, Any]:
        """محاكاة استدعاء API للطقس"""
        await asyncio.sleep(1.2)
        
        import random
        return {
            "location": location,
            "temperature": round(random.uniform(15, 35), 1),
            "condition": random.choice(["Sunny", "Cloudy", "Rainy"]),
            "humidity": random.randint(30, 90)
        }


# === مثال شامل ===

async def example_parallel_vs_sequential():
    """مثال يوضح الفرق بين التنفيذ المتوازي والتسلسلي"""
    
    print("=" * 80)
    print("Parallel Tool Use - Performance Comparison")
    print("=" * 80)
    
    # إنشاء المنفذ
    executor = ParallelToolExecutor(enable_caching=False)
    
    # تسجيل الأدوات
    executor.register_tool(StockPriceTool())
    executor.register_tool(CompanyNewsTool())
    executor.register_tool(WeatherTool())
    
    # استدعاءات الأدوات
    tool_calls = [
        ToolCall(tool_name="get_stock_price", parameters={"symbol": "NVDA"}),
        ToolCall(tool_name="get_company_news", parameters={"company_name": "NVIDIA"}),
        ToolCall(tool_name="get_weather", parameters={"location": "San Francisco"}),
    ]
    
    # التنفيذ التسلسلي
    print("\n🔄 Sequential Execution:")
    print("-" * 80)
    sequential_results = await executor.execute_sequential(tool_calls)
    
    # التنفيذ المتوازي
    print("\n⚡ Parallel Execution:")
    print("-" * 80)
    parallel_results = await executor.execute_parallel(tool_calls)
    
    # المقارنة
    print("\n📊 Performance Comparison:")
    print("-" * 80)
    stats = executor.get_performance_stats()
    
    seq_time = stats["latency"]["max"]  # التسلسلي
    par_time = stats["latency"]["min"]  # المتوازي (تقريبي)
    
    # حساب التحسين
    if seq_time > 0:
        improvement = ((seq_time - par_time) / seq_time) * 100
        time_saved = seq_time - par_time
        
        print(f"Sequential Time: {seq_time:.3f}s")
        print(f"Parallel Time: {par_time:.3f}s")
        print(f"Time Saved: {time_saved:.3f}s ({improvement:.1f}% faster)")
    
    # عرض النتائج
    print("\n📦 Results:")
    print("-" * 80)
    for result in parallel_results:
        if result.success:
            print(f"✅ {result.tool_name}: {result.result}")
        else:
            print(f"❌ {result.tool_name}: {result.error}")
    
    return executor


if __name__ == "__main__":
    asyncio.run(example_parallel_vs_sequential())
