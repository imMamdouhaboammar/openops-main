"""
Agentic Parallelism System - Main Entry Point
============================================
نقطة الدخول الرئيسية للنظام
"""

__version__ = "1.0.0"
__author__ = "OpenOps Team"
__license__ = "MIT"

# Core Imports
from core.base_agent import (
    BaseAgent,
    AgentRole,
    AgentStatus,
    AgentMessage,
    AgentResult,
    PlannerAgent,
    WorkerAgent,
    JudgeAgent
)

from core.state_manager import (
    StateManager,
    AgentStateManager,
    StateUpdateMode,
    StateSnapshot
)

from core.performance_tracker import (
    PerformanceTracker,
    MetricType,
    PerformanceMetric,
    PerformanceReport
)

# Pattern Imports
from patterns.parallel_tool_use.parallel_tool_use import (
    ParallelToolExecutor,
    Tool,
    ToolCall,
    ToolResult
)

from patterns.hypothesis_generation.hypothesis_generation import (
    HypothesisGenerationOrchestrator,
    Hypothesis,
    HypothesisPlan,
    HypothesisResult,
    Evaluation
)

# Integration Imports
from integrations.openops_integration import (
    AgenticParallelismModule,
    OpenOpsWorkflowStage
)

# Convenience exports
__all__ = [
    # Core
    "BaseAgent",
    "AgentRole",
    "AgentStatus",
    "AgentMessage",
    "AgentResult",
    "PlannerAgent",
    "WorkerAgent",
    "JudgeAgent",
    "StateManager",
    "AgentStateManager",
    "StateUpdateMode",
    "StateSnapshot",
    "PerformanceTracker",
    "MetricType",
    "PerformanceMetric",
    "PerformanceReport",
    
    # Patterns
    "ParallelToolExecutor",
    "Tool",
    "ToolCall",
    "ToolResult",
    "HypothesisGenerationOrchestrator",
    "Hypothesis",
    "HypothesisPlan",
    "HypothesisResult",
    "Evaluation",
    
    # Integration
    "AgenticParallelismModule",
    "OpenOpsWorkflowStage"
]


def get_version():
    """Get system version"""
    return __version__


def get_available_patterns():
    """Get list of all available patterns"""
    return [
        "parallel_tool_use",
        "hypothesis_generation",
        "parallel_evaluation",
        "speculative_execution",
        "hierarchical_teams",
        "competitive_ensembles",
        "assembly_line",
        "blackboard_collaboration",
        "redundant_execution",
        "query_expansion",
        "sharded_retrieval",
        "hybrid_search",
        "context_preprocessing",
        "multihop_retrieval"
    ]


def print_system_info():
    """Print system information"""
    print("=" * 80)
    print("Agentic Parallelism System")
    print("=" * 80)
    print(f"Version: {__version__}")
    print(f"Author: {__author__}")
    print(f"License: {__license__}")
    print(f"\nAvailable Patterns: {len(get_available_patterns())}")
    for i, pattern in enumerate(get_available_patterns(), 1):
        print(f"  {i:2d}. {pattern}")
    print("=" * 80)


if __name__ == "__main__":
    print_system_info()
