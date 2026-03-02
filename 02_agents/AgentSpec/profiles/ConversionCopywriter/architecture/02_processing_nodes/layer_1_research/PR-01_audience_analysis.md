# PR-01: Audience Deep Dive Analysis

**Processing Node Specification**
**Layer**: 1 (Research & Psychology)
**Duration**: 5 minutes
**Inputs**: IN-01, IN-02, IN-04

---

## Purpose

Create comprehensive audience psychology profile to inform all copy decisions.

---

## Processing Logic

### Step 1: Synthesize Inputs
- Combine demographics + psychographics
- Identify primary motivators (5-7 key drivers)
- Map decision journey stages

### Step 2: Motivator Extraction
For each audience segment:
1. What problems do they have?
2. What desires drive them?
3. What fears hold them back?
4. What social/professional pressures exist?
5. What aspir ations inspire them?

### Step 3: Decision Triggers
Identify which triggers work best:
- Social proof (others doing it)
- Authority (experts recommend)
- Scarcity (limited availability)
- Urgency (time pressure)
- Reciprocity (give first)
- Commitment (easy start)
- Liking (personal connection)

### Step 4: Objection Mapping
Document common objections:
- Cost concerns
- Implementation fears
- Learning curve
- Integration complexity
- Results uncertainty

### Step 5: Language Pattern Analysis
How does the audience talk about:
- Their pain points
- Desired solutions
- Your competitor
- Success definitions

---

## Output Schema

```json
{
  "audience_profile": {
    "segment": "Marketing Directors at E-commerce Companies",
    "size_estimate": "15,000",
    "decision_maker": "VP of Marketing or CMO",
    "influencers": "Analytics managers, data analysts"
  },
  "primary_motivators": [
    {
      "motivator": "Prove ROI to executives",
      "intensity": "high",
      "emotional_driver": "career advancement"
    },
    {
      "motivator": "Make faster decisions",
      "intensity": "high",
      "emotional_driver": "control + confidence"
    }
  ],
  "decision_triggers": [
    {
      "trigger": "social_proof",
      "strength": "high",
      "example": "Other major companies using it"
    }
  ],
  "common_objections": [
    {
      "objection": "Another tool to manage",
      "frequency": "high",
      "counter": "5-minute setup, automates existing workflows"
    }
  ],
  "language_patterns": {
    "pain_language": "scattered data, slow reporting, manual work",
    "desire_language": "real-time insights, single source of truth",
    "social_language": "industry leaders, forward-thinking teams"
  }
}
```

---

## Success Criteria

✅ 5-7 distinct motivators identified
✅ Decision triggers mapped to psychology
✅ Objections documented with solutions
✅ Language patterns captured authentically
✅ All findings tied to emotional drivers

---

**Prompt**: [PR-01_audience_analysis.md](../../04_prompts/processing_prompts/PR-01_audience_analysis.md)
