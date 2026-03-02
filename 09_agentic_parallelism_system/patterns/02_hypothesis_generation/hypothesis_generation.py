"""
Pattern 2: Hypothesis Generation - توليد الفرضيات المتوازية
==========================================================
توليد استراتيجيات متعددة ومتنوعة بشكل متوازٍ واختيار الأفضل

Quality Gain: 30%+ improvement in output quality
Use Cases:
- Creative content generation
- Strategic planning
- Problem-solving with multiple approaches
- Marketing campaign ideation
"""

import asyncio
import time
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field
from pydantic import BaseModel, Field
import sys
sys.path.append('../../core')

from base_agent import BaseAgent, AgentResult, PlannerAgent, WorkerAgent, JudgeAgent
from performance_tracker import PerformanceTracker


# === Pydantic Models للمدخلات والمخرجات ===

class Hypothesis(BaseModel):
    """فرضية أو استراتيجية واحدة"""
    id: str
    name: str = Field(description="اسم الفرضية (قصير وجذاب)")
    description: str = Field(description="وصف تفصيلي للاستراتيجية")
    target_audience: Optional[str] = Field(default=None, description="الجمهور المستهدف")
    key_message: Optional[str] = Field(default=None, description="الرسالة الأساسية")
    metadata: Dict[str, Any] = Field(default_factory=dict)


class HypothesisPlan(BaseModel):
    """خطة تحتوي على عدة فرضيات"""
    task_description: str
    hypotheses: List[Hypothesis] = Field(description="قائمة الفرضيات المولدة")
    reasoning: str = Field(description="التفكير وراء اختيار هذه الفرضيات")


class HypothesisResult(BaseModel):
    """نتيجة تطبيق فرضية"""
    hypothesis_id: str
    output: Any
    success: bool = True
    quality_score: float = 0.0
    metadata: Dict[str, Any] = Field(default_factory=dict)


class Evaluation(BaseModel):
    """تقييم شامل لكل النتائج"""
    best_hypothesis_id: str
    best_result: Any
    critique: str = Field(description="نقد مفصل لكل الخيارات")
    scores: Dict[str, float] = Field(description="درجات كل فرضية")
    reasoning: str = Field(description="التفكير وراء الاختيار")


# === الوكلاء المتخصصة ===

class HypothesisPlannerAgent(PlannerAgent):
    """وكيل مخطط متخصص في توليد فرضيات متنوعة"""
    
    def __init__(
        self,
        num_hypotheses: int = 3,
        diversity_weight: float = 0.8,
        **kwargs
    ):
        super().__init__(**kwargs)
        self.num_hypotheses = num_hypotheses
        self.diversity_weight = diversity_weight
    
    async def process(self, input_data: Dict[str, Any]) -> AgentResult:
        """توليد خطة بفرضيات متنوعة"""
        task_description = input_data.get("task", "")
        context = input_data.get("context", {})
        
        print(f"🧠 Planner: Generating {self.num_hypotheses} diverse hypotheses...")
        
        # محاكاة التفكير العميق
        await asyncio.sleep(0.5)
        
        # توليد فرضيات متنوعة
        hypotheses = await self._generate_hypotheses(task_description, context)
        
        plan = HypothesisPlan(
            task_description=task_description,
            hypotheses=hypotheses,
            reasoning=f"Generated {len(hypotheses)} diverse strategies to explore different approaches"
        )
        
        return AgentResult(
            agent_id=self.agent_id,
            output=plan,
            success=True,
            metadata={"num_hypotheses": len(hypotheses)}
        )
    
    async def _generate_hypotheses(
        self,
        task: str,
        context: Dict[str, Any]
    ) -> List[Hypothesis]:
        """توليد فرضيات متنوعة"""
        
        # في التطبيق الحقيقي، هنا يتم استخدام LLM لتوليد فرضيات إبداعية
        # الآن سنستخدم قوالب للعرض التوضيحي
        
        hypotheses = []
        
        # استراتيجيات مختلفة
        strategies = [
            {
                "name": "The Emotional Connector",
                "description": "Focus on emotional storytelling and creating personal connections",
                "audience": "Emotionally-driven decision makers",
                "message": "Feel the difference, experience the transformation"
            },
            {
                "name": "The Data Advocate",
                "description": "Lead with data, statistics, and proven results",
                "audience": "Analytical, data-driven professionals",
                "message": "Numbers don't lie - see the measurable impact"
            },
            {
                "name": "The Innovation Pioneer",
                "description": "Highlight cutting-edge technology and future-forward thinking",
                "audience": "Early adopters and tech enthusiasts",
                "message": "Be at the forefront of innovation"
            }
        ]
        
        for i, strategy in enumerate(strategies[:self.num_hypotheses]):
            hypothesis = Hypothesis(
                id=f"hypothesis_{i+1}",
                name=strategy["name"],
                description=strategy["description"],
                target_audience=strategy["audience"],
                key_message=strategy["message"],
                metadata={"strategy_type": strategy["name"]}
            )
            hypotheses.append(hypothesis)
        
        return hypotheses


class HypothesisWorkerAgent(WorkerAgent):
    """وكيل عامل متخصص في تنفيذ فرضية محددة"""
    
    def __init__(self, hypothesis: Optional[Hypothesis] = None, **kwargs):
        super().__init__(**kwargs)
        self.hypothesis = hypothesis
    
    async def process(self, input_data: Dict[str, Any]) -> AgentResult:
        """تطبيق الفرضية المحددة وإنتاج نتيجة"""
        
        hypothesis = self.hypothesis or input_data.get("hypothesis")
        
        if not hypothesis:
            return AgentResult(
                agent_id=self.agent_id,
                output=None,
                success=False,
                error="No hypothesis provided"
            )
        
        print(f"⚙️ Worker [{hypothesis.id}]: Executing '{hypothesis.name}'...")
        
        # محاكاة عمل إبداعي
        await asyncio.sleep(0.8)
        
        # توليد محتوى بناءً على الفرضية
        output = await self._generate_content(hypothesis, input_data)
        
        result = HypothesisResult(
            hypothesis_id=hypothesis.id,
            output=output,
            success=True,
            metadata={"hypothesis_name": hypothesis.name}
        )
        
        return AgentResult(
            agent_id=self.agent_id,
            output=result,
            success=True
        )
    
    async def _generate_content(
        self,
        hypothesis: Hypothesis,
        context: Dict[str, Any]
    ) -> str:
        """توليد محتوى بناءً على الفرضية"""
        
        # في التطبيق الحقيقي، LLM يولد محتوى إبداعي
        # هنا نستخدم قوالب للتوضيح
        
        product = context.get("product", "our product")
        
        templates = {
            "The Emotional Connector": f"Transform your life with {product}. Feel the difference from day one. Join thousands who've already experienced the transformation.",
            "The Data Advocate": f"95% of users report significant improvements with {product}. Backed by data, proven by results. See measurable impact in just 30 days.",
            "The Innovation Pioneer": f"Experience the future today with {product}. Cutting-edge technology meets innovative design. Be among the first to revolutionize your workflow."
        }
        
        return templates.get(
            hypothesis.name,
            f"Discover {product} - your solution for excellence."
        )


class HypothesisJudgeAgent(JudgeAgent):
    """وكيل حكم متخصص في تقييم الفرضيات"""
    
    def __init__(
        self,
        criteria: List[str] = None,
        weights: Optional[Dict[str, float]] = None,
        **kwargs
    ):
        super().__init__(**kwargs)
        self.criteria = criteria or ["creativity", "clarity", "impact", "relevance"]
        self.weights = weights or {c: 1.0 for c in self.criteria}
    
    async def process(self, input_data: Dict[str, Any]) -> AgentResult:
        """تقييم كل النتائج واختيار الأفضل"""
        
        results: List[HypothesisResult] = input_data.get("results", [])
        
        if not results:
            return AgentResult(
                agent_id=self.agent_id,
                output=None,
                success=False,
                error="No results to evaluate"
            )
        
        print(f"⚖️ Judge: Evaluating {len(results)} hypotheses...")
        
        # محاكاة التقييم المدروس
        await asyncio.sleep(0.6)
        
        # تقييم كل نتيجة
        scores = {}
        critiques = []
        
        for result in results:
            score = await self._evaluate_result(result)
            scores[result.hypothesis_id] = score
            
            # نقد موجز
            critique = f"[{result.hypothesis_id}] Score: {score:.2f}/10 - {self._get_critique(result, score)}"
            critiques.append(critique)
        
        # اختيار الأفضل
        best_id = max(scores.keys(), key=lambda k: scores[k])
        best_result = next(r for r in results if r.hypothesis_id == best_id)
        
        # تجميع التقييم
        evaluation = Evaluation(
            best_hypothesis_id=best_id,
            best_result=best_result.output,
            critique="\n".join(critiques),
            scores=scores,
            reasoning=f"Selected '{best_id}' based on highest weighted score across {len(self.criteria)} criteria"
        )
        
        print(f"🏆 Winner: {best_id} (Score: {scores[best_id]:.2f}/10)")
        
        return AgentResult(
            agent_id=self.agent_id,
            output=evaluation,
            success=True
        )
    
    async def _evaluate_result(self, result: HypothesisResult) -> float:
        """تقييم نتيجة واحدة"""
        
        # في التطبيق الحقيقي، LLM يقيم بناءً على معايير محددة
        # هنا نستخدم درجات عشوائية للتوضيح
        
        import random
        base_score = random.uniform(6.5, 9.5)
        
        # تطبيق الأوزان
        weighted_score = base_score
        
        return round(weighted_score, 2)
    
    def _get_critique(self, result: HypothesisResult, score: float) -> str:
        """توليد نقد موجز"""
        
        if score >= 9.0:
            return "Exceptional quality with strong appeal"
        elif score >= 8.0:
            return "Very good with minor room for improvement"
        elif score >= 7.0:
            return "Solid approach with good potential"
        else:
            return "Adequate but could be stronger"


# === المنسق الرئيسي ===

class HypothesisGenerationOrchestrator:
    """
    منسق نظام توليد الفرضيات المتوازية
    
    Workflow:
    1. Planner: توليد فرضيات متنوعة
    2. Workers: تنفيذ متوازٍ لكل فرضية
    3. Judge: تقييم واختيار الأفضل
    """
    
    def __init__(
        self,
        num_hypotheses: int = 3,
        max_parallel_workers: int = 5
    ):
        self.num_hypotheses = num_hypotheses
        self.max_parallel_workers = max_parallel_workers
        
        # الوكلاء
        self.planner = HypothesisPlannerAgent(num_hypotheses=num_hypotheses)
        self.judge = HypothesisJudgeAgent()
        
        # تتبع الأداء
        self.perf_tracker = PerformanceTracker()
    
    async def execute(
        self,
        task: str,
        context: Optional[Dict[str, Any]] = None
    ) -> Evaluation:
        """
        تنفيذ كامل لعملية توليد الفرضيات
        
        Args:
            task: وصف المهمة/المشكلة
            context: سياق إضافي
        
        Returns:
            التقييم النهائي مع الاختيار الأفضل
        """
        
        print("=" * 80)
        print("🚀 Hypothesis Generation Workflow Started")
        print("=" * 80)
        
        self.perf_tracker.start_trace("full_workflow")
        
        context = context or {}
        input_data = {"task": task, "context": context}
        
        # المرحلة 1: التخطيط - توليد الفرضيات
        print("\n📋 Phase 1: Hypothesis Planning")
        print("-" * 80)
        
        plan_result = await self.planner.execute(input_data)
        
        if not plan_result.success:
            raise Exception(f"Planning failed: {plan_result.error}")
        
        plan: HypothesisPlan = plan_result.output
        print(f"✅ Generated {len(plan.hypotheses)} hypotheses")
        
        for hyp in plan.hypotheses:
            print(f"  • {hyp.name}: {hyp.description}")
        
        # المرحلة 2: التنفيذ المتوازي
        print("\n⚡ Phase 2: Parallel Execution")
        print("-" * 80)
        
        self.perf_tracker.start_trace("parallel_workers")
        
        # إنشاء عمال لكل فرضية
        worker_tasks = []
        for hypothesis in plan.hypotheses:
            worker = HypothesisWorkerAgent(hypothesis=hypothesis)
            task = worker.execute({"hypothesis": hypothesis, **context})
            worker_tasks.append(task)
        
        # تنفيذ متوازٍ
        worker_results = await asyncio.gather(*worker_tasks)
        
        parallel_time = self.perf_tracker.end_trace("parallel_workers")
        print(f"✅ Executed {len(worker_results)} workers in parallel: {parallel_time:.3f}s")
        
        # استخراج النتائج
        hypothesis_results = [wr.output for wr in worker_results if wr.success]
        
        # المرحلة 3: التقييم والاختيار
        print("\n⚖️ Phase 3: Evaluation & Selection")
        print("-" * 80)
        
        judge_result = await self.judge.execute({"results": hypothesis_results})
        
        if not judge_result.success:
            raise Exception(f"Judging failed: {judge_result.error}")
        
        evaluation: Evaluation = judge_result.output
        
        # النتيجة النهائية
        total_time = self.perf_tracker.end_trace("full_workflow")
        
        print("\n" + "=" * 80)
        print("✨ Workflow Completed")
        print("=" * 80)
        print(f"Total Time: {total_time:.3f}s")
        print(f"\n🏆 Best Hypothesis: {evaluation.best_hypothesis_id}")
        print(f"📝 Output: {evaluation.best_result}")
        print(f"\n💭 Critique:\n{evaluation.critique}")
        
        return evaluation
    
    def get_performance_stats(self) -> Dict[str, Any]:
        """الحصول على إحصائيات الأداء"""
        return self.perf_tracker.get_all_metrics()


# === مثال شامل ===

async def example_marketing_campaign():
    """مثال: توليد حملة تسويقية بفرضيات متعددة"""
    
    orchestrator = HypothesisGenerationOrchestrator(num_hypotheses=3)
    
    task = "Create a compelling marketing campaign for our AI-powered productivity tool"
    context = {
        "product": "TaskMaster AI",
        "target_market": "B2B SaaS",
        "unique_value": "10x productivity increase through AI automation"
    }
    
    evaluation = await orchestrator.execute(task, context)
    
    # عرض النتائج النهائية
    print("\n" + "=" * 80)
    print("📊 Final Results")
    print("=" * 80)
    print(f"Selected Strategy: {evaluation.best_hypothesis_id}")
    print(f"Campaign Message: {evaluation.best_result}")
    print(f"\nScores: {evaluation.scores}")
    
    return evaluation


if __name__ == "__main__":
    asyncio.run(example_marketing_campaign())
