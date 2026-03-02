"""
Performance Tracker - متتبع الأداء
===================================
نظام شامل لتتبع وتحليل أداء النظام والوكلاء
"""

import time
import statistics
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field
from collections import defaultdict, deque
from enum import Enum
import asyncio


class MetricType(Enum):
    """أنواع المقاييس"""
    LATENCY = "latency"
    THROUGHPUT = "throughput"
    MEMORY = "memory"
    NETWORK = "network"
    QUALITY = "quality"
    SUCCESS_RATE = "success_rate"


@dataclass
class PerformanceMetric:
    """مقياس أداء واحد"""
    name: str
    value: float
    unit: str
    timestamp: float = field(default_factory=time.time)
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class PerformanceReport:
    """تقرير أداء شامل"""
    report_id: str
    timestamp: float
    duration: float
    metrics: Dict[str, List[PerformanceMetric]]
    summary: Dict[str, Any]
    recommendations: List[str] = field(default_factory=list)


class PerformanceTracker:
    """
    متتبع الأداء الرئيسي
    
    Features:
    - تتبع الزمن (Latency)
    - معدل الإنجاز (Throughput)
    - استهلاك الذاكرة
    - جودة النتائج
    - توليد تقارير مفصلة
    """
    
    def __init__(
        self,
        window_size: int = 100,
        enable_percentiles: bool = True,
        alert_threshold: Optional[Dict[str, float]] = None
    ):
        self.window_size = window_size
        self.enable_percentiles = enable_percentiles
        self.alert_threshold = alert_threshold or {}
        
        # مخازن المقاييس
        self._metrics: Dict[str, deque] = defaultdict(lambda: deque(maxlen=window_size))
        
        # نقاط التتبع النشطة (للمهام الجارية)
        self._active_traces: Dict[str, float] = {}
        
        # سجل التقارير
        self._reports: List[PerformanceReport] = []
        
        # الإحصائيات الإجمالية
        self._cumulative_stats = {
            "total_operations": 0,
            "successful_operations": 0,
            "failed_operations": 0,
            "total_execution_time": 0.0
        }
        
        # العتبات للتنبيهات
        self._alerts: List[Dict[str, Any]] = []
    
    def start_trace(self, trace_id: str):
        """بدء تتبع عملية"""
        self._active_traces[trace_id] = time.time()
    
    def end_trace(self, trace_id: str, metadata: Optional[Dict] = None) -> float:
        """إنهاء تتبع عملية وحساب المدة"""
        if trace_id not in self._active_traces:
            return 0.0
        
        start_time = self._active_traces.pop(trace_id)
        duration = time.time() - start_time
        
        # تسجيل المقياس
        metric = PerformanceMetric(
            name=trace_id,
            value=duration,
            unit="seconds",
            metadata=metadata or {}
        )
        
        self._metrics[MetricType.LATENCY.value].append(metric)
        self._cumulative_stats["total_execution_time"] += duration
        
        # فحص العتبات
        if "latency" in self.alert_threshold:
            if duration > self.alert_threshold["latency"]:
                self._add_alert(
                    metric_type="latency",
                    value=duration,
                    threshold=self.alert_threshold["latency"],
                    trace_id=trace_id
                )
        
        return duration
    
    def record_metric(
        self,
        metric_type: MetricType,
        value: float,
        unit: str = "",
        name: str = "",
        metadata: Optional[Dict] = None
    ):
        """تسجيل مقياس يدوياً"""
        metric = PerformanceMetric(
            name=name or metric_type.value,
            value=value,
            unit=unit,
            metadata=metadata or {}
        )
        
        self._metrics[metric_type.value].append(metric)
        
        # فحص العتبات
        if metric_type.value in self.alert_threshold:
            if value > self.alert_threshold[metric_type.value]:
                self._add_alert(
                    metric_type=metric_type.value,
                    value=value,
                    threshold=self.alert_threshold[metric_type.value],
                    trace_id=name
                )
    
    def record_success(self):
        """تسجيل عملية ناجحة"""
        self._cumulative_stats["total_operations"] += 1
        self._cumulative_stats["successful_operations"] += 1
    
    def record_failure(self):
        """تسجيل عملية فاشلة"""
        self._cumulative_stats["total_operations"] += 1
        self._cumulative_stats["failed_operations"] += 1
    
    def get_latency_stats(self) -> Dict[str, float]:
        """الحصول على إحصائيات الزمن"""
        latency_metrics = list(self._metrics[MetricType.LATENCY.value])
        
        if not latency_metrics:
            return {
                "count": 0,
                "mean": 0.0,
                "median": 0.0,
                "min": 0.0,
                "max": 0.0,
                "std_dev": 0.0
            }
        
        values = [m.value for m in latency_metrics]
        
        stats = {
            "count": len(values),
            "mean": statistics.mean(values),
            "median": statistics.median(values),
            "min": min(values),
            "max": max(values),
            "std_dev": statistics.stdev(values) if len(values) > 1 else 0.0
        }
        
        # حساب النسب المئوية
        if self.enable_percentiles and len(values) >= 10:
            sorted_values = sorted(values)
            stats["p50"] = statistics.median(sorted_values)
            stats["p90"] = sorted_values[int(len(sorted_values) * 0.9)]
            stats["p95"] = sorted_values[int(len(sorted_values) * 0.95)]
            stats["p99"] = sorted_values[int(len(sorted_values) * 0.99)]
        
        return stats
    
    def get_throughput(self, window_seconds: float = 60.0) -> float:
        """حساب معدل الإنجاز (عمليات/ثانية)"""
        latency_metrics = list(self._metrics[MetricType.LATENCY.value])
        
        if not latency_metrics:
            return 0.0
        
        # العمليات في النافذة الزمنية المحددة
        current_time = time.time()
        recent_operations = [
            m for m in latency_metrics
            if current_time - m.timestamp <= window_seconds
        ]
        
        if not recent_operations:
            return 0.0
        
        return len(recent_operations) / window_seconds
    
    def get_success_rate(self) -> float:
        """حساب معدل النجاح"""
        total = self._cumulative_stats["total_operations"]
        if total == 0:
            return 0.0
        
        successful = self._cumulative_stats["successful_operations"]
        return successful / total
    
    def get_all_metrics(self) -> Dict[str, Any]:
        """الحصول على كل المقاييس"""
        return {
            "latency": self.get_latency_stats(),
            "throughput": self.get_throughput(),
            "success_rate": self.get_success_rate(),
            "cumulative_stats": self._cumulative_stats.copy(),
            "active_traces": len(self._active_traces),
            "total_metrics": sum(len(m) for m in self._metrics.values())
        }
    
    def _add_alert(self, metric_type: str, value: float, threshold: float, trace_id: str):
        """إضافة تنبيه"""
        alert = {
            "timestamp": time.time(),
            "metric_type": metric_type,
            "value": value,
            "threshold": threshold,
            "trace_id": trace_id,
            "message": f"{metric_type} exceeded threshold: {value:.2f} > {threshold:.2f}"
        }
        
        self._alerts.append(alert)
    
    def get_alerts(self, limit: Optional[int] = None) -> List[Dict[str, Any]]:
        """الحصول على التنبيهات"""
        if limit:
            return self._alerts[-limit:]
        return self._alerts.copy()
    
    def clear_alerts(self):
        """مسح التنبيهات"""
        self._alerts.clear()
    
    def generate_report(self, duration: float = 0.0) -> PerformanceReport:
        """توليد تقرير أداء شامل"""
        report_id = f"report_{int(time.time())}"
        
        # جمع كل المقاييس
        all_metrics = {}
        for metric_type, metrics_deque in self._metrics.items():
            all_metrics[metric_type] = list(metrics_deque)
        
        # الملخص
        summary = self.get_all_metrics()
        
        # التوصيات
        recommendations = self._generate_recommendations(summary)
        
        report = PerformanceReport(
            report_id=report_id,
            timestamp=time.time(),
            duration=duration,
            metrics=all_metrics,
            summary=summary,
            recommendations=recommendations
        )
        
        self._reports.append(report)
        return report
    
    def _generate_recommendations(self, summary: Dict[str, Any]) -> List[str]:
        """توليد توصيات بناءً على الأداء"""
        recommendations = []
        
        # توصيات بناءً على الزمن
        latency_stats = summary.get("latency", {})
        if latency_stats.get("mean", 0) > 2.0:
            recommendations.append(
                "⚠️ متوسط زمن الاستجابة مرتفع (>2s). "
                "اعتبر استخدام التخزين المؤقت أو التوازي."
            )
        
        # توصيات بناءً على معدل النجاح
        success_rate = summary.get("success_rate", 0)
        if success_rate < 0.9:
            recommendations.append(
                f"⚠️ معدل النجاح منخفض ({success_rate:.1%}). "
                "فحص معالجة الأخطاء والموثوقية."
            )
        
        # توصيات بناءً على معدل الإنجاز
        throughput = summary.get("throughput", 0)
        if throughput < 1.0:
            recommendations.append(
                f"💡 معدل الإنجاز منخفض ({throughput:.2f} ops/s). "
                "اعتبر زيادة التوازي."
            )
        
        # توصيات بناءً على الانحراف المعياري
        if latency_stats.get("std_dev", 0) > latency_stats.get("mean", 0) * 0.5:
            recommendations.append(
                "⚠️ تباين كبير في زمن الاستجابة. "
                "فحص العمليات البطيئة والاختناقات."
            )
        
        return recommendations
    
    def compare_reports(
        self,
        report1: PerformanceReport,
        report2: PerformanceReport
    ) -> Dict[str, Any]:
        """مقارنة تقريرين"""
        comparison = {
            "latency_change": {},
            "throughput_change": 0.0,
            "success_rate_change": 0.0
        }
        
        # مقارنة الزمن
        latency1 = report1.summary.get("latency", {}).get("mean", 0)
        latency2 = report2.summary.get("latency", {}).get("mean", 0)
        
        if latency1 > 0:
            comparison["latency_change"] = {
                "absolute": latency2 - latency1,
                "percentage": ((latency2 - latency1) / latency1) * 100
            }
        
        # مقارنة معدل الإنجاز
        throughput1 = report1.summary.get("throughput", 0)
        throughput2 = report2.summary.get("throughput", 0)
        
        if throughput1 > 0:
            comparison["throughput_change"] = ((throughput2 - throughput1) / throughput1) * 100
        
        # مقارنة معدل النجاح
        success_rate1 = report1.summary.get("success_rate", 0)
        success_rate2 = report2.summary.get("success_rate", 0)
        
        comparison["success_rate_change"] = (success_rate2 - success_rate1) * 100
        
        return comparison
    
    def reset(self):
        """إعادة تعيين كل المقاييس"""
        self._metrics.clear()
        self._active_traces.clear()
        self._alerts.clear()
        self._cumulative_stats = {
            "total_operations": 0,
            "successful_operations": 0,
            "failed_operations": 0,
            "total_execution_time": 0.0
        }


# مثال على الاستخدام
if __name__ == "__main__":
    import asyncio
    
    async def simulate_operation(tracker: PerformanceTracker, op_id: str, duration: float):
        """محاكاة عملية"""
        tracker.start_trace(op_id)
        await asyncio.sleep(duration)
        tracker.end_trace(op_id)
        
        # تسجيل النجاح أو الفشل عشوائياً
        import random
        if random.random() > 0.1:
            tracker.record_success()
        else:
            tracker.record_failure()
    
    async def main():
        # إنشاء المتتبع
        tracker = PerformanceTracker(
            window_size=100,
            enable_percentiles=True,
            alert_threshold={"latency": 2.0}
        )
        
        # محاكاة عمليات متعددة
        tasks = []
        for i in range(20):
            import random
            duration = random.uniform(0.1, 3.0)
            task = simulate_operation(tracker, f"operation_{i}", duration)
            tasks.append(task)
        
        await asyncio.gather(*tasks)
        
        # الإحصائيات
        stats = tracker.get_all_metrics()
        print("=== Performance Statistics ===")
        print(f"Latency: {stats['latency']}")
        print(f"Throughput: {stats['throughput']:.2f} ops/s")
        print(f"Success Rate: {stats['success_rate']:.1%}")
        
        # التنبيهات
        alerts = tracker.get_alerts()
        if alerts:
            print(f"\n⚠️ {len(alerts)} Alerts:")
            for alert in alerts[:5]:
                print(f"  - {alert['message']}")
        
        # توليد تقرير
        report = tracker.generate_report(duration=10.0)
        print(f"\n=== Report {report.report_id} ===")
        print(f"Recommendations:")
        for rec in report.recommendations:
            print(f"  {rec}")
    
    asyncio.run(main())
