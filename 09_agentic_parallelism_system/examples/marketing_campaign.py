"""
Complete Example: Marketing Campaign with Agentic Parallelism
===========================================================
مثال شامل يوضح استخدام عدة أنماط معاً في سيناريو حقيقي
"""

import asyncio
import time
from typing import Dict, List, Any
import sys
sys.path.append('../integrations')
sys.path.append('../patterns/01_parallel_tool_use')
sys.path.append('../patterns/02_hypothesis_generation')

from openops_integration import AgenticParallelismModule
from parallel_tool_use import Tool
from hypothesis_generation import HypothesisGenerationOrchestrator


# === أدوات مخصصة للمثال ===

class MarketResearchTool(Tool):
    """أداة بحث السوق"""
    
    def __init__(self):
        super().__init__(
            name="market_research",
            description="Conduct comprehensive market research"
        )
    
    async def execute(self, industry: str, region: str = "global") -> Dict[str, Any]:
        """محاكاة بحث السوق"""
        await asyncio.sleep(2.0)  # محاكاة استدعاء API
        
        return {
            "industry": industry,
            "region": region,
            "market_size": "$150B",
            "growth_rate": "25% YoY",
            "key_trends": [
                "AI adoption accelerating",
                "Focus on automation",
                "Privacy concerns rising"
            ],
            "target_segments": [
                "Enterprise (40%)",
                "SMB (35%)",
                "Consumer (25%)"
            ]
        }


class CompetitorAnalysisTool(Tool):
    """أداة تحليل المنافسين"""
    
    def __init__(self):
        super().__init__(
            name="competitor_analysis",
            description="Analyze competitor strategies and positioning"
        )
    
    async def execute(self, competitors: List[str]) -> Dict[str, Any]:
        """محاكاة تحليل المنافسين"""
        await asyncio.sleep(1.8)
        
        return {
            "analyzed_competitors": len(competitors),
            "market_leaders": competitors[:2],
            "strengths": {
                competitors[0]: ["Brand recognition", "Large user base"],
                competitors[1]: ["Innovative features", "Strong pricing"]
            },
            "weaknesses": {
                competitors[0]: ["Complex UI", "Limited customization"],
                competitors[1]: ["Smaller market share", "Customer support"]
            },
            "opportunities": [
                "Better user experience",
                "More flexible pricing",
                "Superior customer support"
            ]
        }


class SentimentAnalysisTool(Tool):
    """أداة تحليل المشاعر"""
    
    def __init__(self):
        super().__init__(
            name="sentiment_analysis",
            description="Analyze customer sentiment and feedback"
        )
    
    async def execute(self, sources: List[str]) -> Dict[str, Any]:
        """محاكاة تحليل المشاعر"""
        await asyncio.sleep(1.5)
        
        return {
            "overall_sentiment": "Positive (72%)",
            "sentiment_breakdown": {
                "positive": 72,
                "neutral": 18,
                "negative": 10
            },
            "key_themes": {
                "positive": ["Easy to use", "Time-saving", "Great support"],
                "negative": ["Pricing concerns", "Limited features", "Learning curve"]
            },
            "net_promoter_score": 45
        }


# === السيناريو الكامل ===

async def comprehensive_marketing_campaign():
    """
    سيناريو كامل: حملة تسويقية شاملة
    
    المراحل:
    1. بحث متوازٍ (سوق + منافسين + مشاعر)
    2. توليد استراتيجيات متعددة بناءً على البحث
    3. تقييم واختيار الأفضل
    """
    
    print("=" * 100)
    print("🚀 COMPREHENSIVE MARKETING CAMPAIGN WORKFLOW")
    print("=" * 100)
    print("\nProduct: AI-Powered Project Management Tool")
    print("Goal: Launch campaign for Q1 2026")
    print("Budget: $500K")
    
    start_time = time.time()
    
    # === المرحلة 0: التهيئة ===
    print("\n" + "=" * 100)
    print("⚙️ PHASE 0: INITIALIZATION")
    print("=" * 100)
    
    module = AgenticParallelismModule(patterns="all", auto_optimize=True)
    print("✅ Module initialized")
    
    # === المرحلة 1: البحث المتوازي ===
    print("\n" + "=" * 100)
    print("📊 PHASE 1: PARALLEL MARKET RESEARCH")
    print("=" * 100)
    
    research_result = await module.execute_pattern(
        pattern_name="parallel_tool_use",
        input_data={
            "tool_calls": [
                {
                    "tool_name": "market_research",
                    "parameters": {"industry": "Project Management", "region": "North America"}
                },
                {
                    "tool_name": "competitor_analysis",
                    "parameters": {"competitors": ["Asana", "Monday.com", "Jira"]}
                },
                {
                    "tool_name": "sentiment_analysis",
                    "parameters": {"sources": ["Twitter", "Reddit", "Reviews"]}
                }
            ],
            "tools": {
                "market_research": MarketResearchTool(),
                "competitor_analysis": CompetitorAnalysisTool(),
                "sentiment_analysis": SentimentAnalysisTool()
            }
        },
        config={"enable_caching": True}
    )
    
    print(f"\n✅ Research completed in {research_result['execution_time']:.2f}s")
    print(f"📦 Collected data from {research_result['result']['total_tools']} sources")
    
    # استخراج النتائج
    research_data = {}
    for tool_result in research_result['result']['results']:
        if tool_result['success']:
            research_data[tool_result['tool_name']] = tool_result['result']
            print(f"  ✓ {tool_result['tool_name']}: {tool_result['execution_time']:.2f}s")
    
    # === المرحلة 2: توليد الاستراتيجيات ===
    print("\n" + "=" * 100)
    print("💡 PHASE 2: HYPOTHESIS GENERATION - STRATEGY CREATION")
    print("=" * 100)
    
    # إعداد السياق من البحث
    campaign_context = {
        "product": "ProjectFlow AI",
        "market_insights": research_data.get("market_research", {}),
        "competitive_landscape": research_data.get("competitor_analysis", {}),
        "customer_sentiment": research_data.get("sentiment_analysis", {}),
        "budget": "$500K",
        "timeline": "Q1 2026"
    }
    
    strategy_result = await module.execute_pattern(
        pattern_name="hypothesis_generation",
        input_data={
            "task": (
                "Create a compelling go-to-market strategy and campaign "
                "for ProjectFlow AI, targeting enterprise and SMB customers. "
                "Consider market trends, competitive positioning, and customer feedback."
            ),
            "context": campaign_context
        },
        config={"num_hypotheses": 3}
    )
    
    print(f"\n✅ Strategy generation completed in {strategy_result['execution_time']:.2f}s")
    
    # === عرض النتائج النهائية ===
    print("\n" + "=" * 100)
    print("📋 FINAL CAMPAIGN STRATEGY")
    print("=" * 100)
    
    if strategy_result['success']:
        result = strategy_result['result']
        
        print(f"\n🏆 SELECTED STRATEGY: {result['best_hypothesis']}")
        print("-" * 100)
        print(f"\n{result['best_result']}")
        
        print(f"\n\n📊 ALL STRATEGIES EVALUATED:")
        print("-" * 100)
        for hyp_id, score in result['scores'].items():
            print(f"  • {hyp_id}: {score:.1f}/10")
        
        print(f"\n\n💭 EVALUATION CRITIQUE:")
        print("-" * 100)
        print(result['critique'])
        
        print(f"\n\n🧠 REASONING:")
        print("-" * 100)
        print(result['reasoning'])
    
    # === الإحصائيات الكلية ===
    total_time = time.time() - start_time
    
    print("\n" + "=" * 100)
    print("📈 WORKFLOW STATISTICS")
    print("=" * 100)
    
    stats = module.get_module_stats()
    
    print(f"\nTotal Workflow Time: {total_time:.2f}s")
    print(f"Patterns Used: {len(stats['active_patterns'])}")
    print(f"Total Pattern Executions: {stats['total_executions']}")
    
    print("\n🎯 Pattern Performance:")
    for pattern, stat in stats['pattern_stats'].items():
        success_rate = (
            stat['success_count'] / stat['usage_count'] * 100
            if stat['usage_count'] > 0
            else 0
        )
        print(f"  • {pattern}:")
        print(f"    - Usage: {stat['usage_count']}x")
        print(f"    - Success Rate: {success_rate:.1f}%")
    
    perf = stats['performance']
    print(f"\n⚡ Performance Metrics:")
    print(f"  • Throughput: {perf['throughput']:.2f} ops/sec")
    print(f"  • Success Rate: {perf['success_rate']:.1%}")
    print(f"  • Avg Latency: {perf['latency'].get('mean', 0):.2f}s")
    
    # === التوصيات ===
    print("\n" + "=" * 100)
    print("💡 ACTIONABLE RECOMMENDATIONS")
    print("=" * 100)
    
    recommendations = [
        "✅ Execute the selected strategy immediately - all data supports this direction",
        "📊 Allocate 40% of budget to digital channels based on target segment analysis",
        "🎯 Focus messaging on 'ease of use' and 'time-saving' - top positive sentiment themes",
        "⚠️ Address pricing concerns proactively - identified as key negative theme",
        "🔄 Monitor competitor response weekly - market is highly competitive",
        "📈 Set up A/B testing for campaign variations to optimize performance"
    ]
    
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec}")
    
    print("\n" + "=" * 100)
    print("✨ WORKFLOW COMPLETED SUCCESSFULLY")
    print("=" * 100)
    
    return {
        "research_data": research_data,
        "strategy": strategy_result['result'],
        "total_time": total_time,
        "stats": stats
    }


# === مثال سريع ===

async def quick_example():
    """مثال سريع لعرض القدرات"""
    
    print("🚀 Quick Example: Parallel Research + Strategy Generation\n")
    
    module = AgenticParallelismModule(patterns="all")
    
    # بحث سريع
    print("1️⃣ Running parallel market research...")
    research = await module.execute_pattern(
        "parallel_tool_use",
        {
            "tool_calls": [
                {"tool_name": "market_research", "parameters": {"industry": "AI"}},
                {"tool_name": "competitor_analysis", "parameters": {"competitors": ["A", "B"]}}
            ],
            "tools": {
                "market_research": MarketResearchTool(),
                "competitor_analysis": CompetitorAnalysisTool()
            }
        }
    )
    print(f"   ✅ Done in {research['execution_time']:.2f}s\n")
    
    # توليد استراتيجية
    print("2️⃣ Generating marketing strategies...")
    strategy = await module.execute_pattern(
        "hypothesis_generation",
        {
            "task": "Create marketing strategy for AI product",
            "context": {"product": "AI Assistant"}
        },
        {"num_hypotheses": 3}
    )
    print(f"   ✅ Done in {strategy['execution_time']:.2f}s")
    print(f"   🏆 Winner: {strategy['result']['best_hypothesis']}")
    
    print(f"\n✨ Total: {research['execution_time'] + strategy['execution_time']:.2f}s")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "quick":
        asyncio.run(quick_example())
    else:
        asyncio.run(comprehensive_marketing_campaign())
