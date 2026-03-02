-

### 📘 File Name

`05B_StrategIQ_Competitive_Research_Engine_Guide.md`

---

```markdown
# StrategIQ Competitive Research Engine — Activation & Operations Guide  
Version: 1.0.0  
Author: StrategIQ OS by OpenOps Studio | Created by Mamdouh Aboammar  
LinkedIn: [https://www.linkedin.com/in/mamdouh-aboammar](https://www.linkedin.com/in/mamdouh-aboammar)

---

## 🧭 Purpose

This guide defines how to **activate**, **operate**, and **validate** the StrategIQ Competitive Research Engine (CRE).  
The CRE is an advanced research subsystem within StrategIQ OS designed to generate **deep competitive insights**, uncover **hidden opportunities**, and produce **evidence-backed strategic reports** that change decisions.

---

## 🧠 System Definition

| Property | Description |
|-----------|-------------|
| **System Name** | StrategIQ Competitive Research Engine (CRE) |
| **Type** | Multi-Agent Research Intelligence Module |
| **Function** | Conduct deep market & competitor intelligence with verified evidence |
| **Integration Layer** | StrategIQ OS / Research & Intelligence Framework |
| **Primary Output** | Executive-Grade Competitive Intelligence Reports |
| **Output Format** | JSON / PDF / Markdown Summary |

---

## ⚙️ Activation Logic

StrategIQ OS automatically activates the **CRE** when any of the following conditions are met:

| Trigger | Description |
|----------|-------------|
| `research_intent == "competitive"` | User explicitly requests competitive or market intelligence |
| `scope.includes("competitors")` | The project brief references competitor analysis |
| `decision_requires_evidence == true` | The request demands strategic proof or insight validation |
| `growth_stage in ["market_expansion","positioning_shift","brand_audit"]` | The brand is scaling or repositioning |

Activation Flow:
```

Orchestrator → Research Supervisor Agent → Competitive Intelligence Agent → Evidence Scoring → Insight Synthesis → QA → Report

````

---

## 🧩 Agents Matrix (CRE Squad)

| Agent ID | Role | Primary Responsibility | Dependencies |
|-----------|------|------------------------|---------------|
| A01 | Chief Intelligence Strategist | Orchestrate all research operations | Orchestrator |
| A02 | Market Intelligence Analyst | Market scale, TAM/SAM behavior | Source Access Proxy |
| A03 | Competitive Intelligence Agent | Landscape mapping, positioning matrix | Data Evidence Model |
| A04 | Behavioral Insights Researcher | Extract behavioral signals & reviews | External Sources Index |
| A05 | Pricing & Positioning Specialist | Benchmark offers, pricing, and perceived value | Intelligence Aggregator |
| A06 | Brand Perception Analyst | Tone and narrative for competitive brands | NLP Sentiment Model |
| A07 | Tech Stack Analyst | Discover underlying infrastructure & moats | Tech Intelligence Adapter |
| A08 | Growth Signal Detector | Detect anomalies (ads, hiring, traffic) | Intelligence Signal Aggregator |
| A09 | Research QA Evaluator | Validate sources, detect contradictions | Evidence Scoring Model |
| A10 | Report Synthesizer | Generate final report structure & insights | All agents above |

Each agent operates under **layered authority** from OpenOps’ Agent System & Activation Matrix:
- **Domain Authorities:** Intelligence, Strategy, Growth
- **Specialists:** Data, Behavioral, Pricing
- **Skeptics:** QA & Contradiction Analysis

---

## 🔍 Grounding Framework

### 1. External Grounding
| Source | Purpose | Verification |
|---------|----------|--------------|
| Crunchbase | Market traction & funding signals | 2 independent confirmations |
| SimilarWeb | Traffic and acquisition insights | Trend validation over 3 months |
| ProductHunt / Reddit | Sentiment & early adoption signals | Context relevance |
| LinkedIn / Talent Graph | Team growth, roles, and expansion | Must match growth narrative |
| Google Trends | Popularity vs demand validation | 90-day rolling average |
| Analyst Reports | Cross-validation for trends | Must cite author/date |

**Rule:** 3 independent confirmations required per insight.

### 2. Internal Grounding
| Component | Description |
|------------|-------------|
| PRD Context | Use brand’s Product Requirement Document |
| Marketing Brief | Extract messaging, ICP, positioning hypothesis |
| Funnel Data | Retention, activation, CAC payback |
| Content Analysis | Tone, channel behavior, hooks |
| Analytics | Compare KPIs vs benchmark competitors |

---

## 🧮 Evidence Scoring Model

Each data point is assigned a **credibility score** using the OpenOps Data Evidence Scoring Model:

| Attribute | Weight | Description |
|------------|---------|-------------|
| Source Authenticity | 0.3 | Origin credibility |
| Data Freshness | 0.25 | Recency under 120 days |
| Relevance | 0.25 | Ties directly to decision context |
| Signal Strength | 0.2 | Distinct trend or anomaly |
| **Threshold** | ≥ 0.75 | Required for inclusion |

Any evidence below this threshold is discarded.

---

## 🔄 Research Lifecycle (CRE Workflow)

| Phase | Description | Outputs |
|--------|-------------|----------|
| 1. Intent Clarification | Clarify decision impact and unknowns | Research Brief |
| 2. Data Collection | Aggregate multi-source evidence | Raw Evidence Set |
| 3. Scoring & Filtering | Rank, validate, and discard low-trust data | Scored Dataset |
| 4. Synthesis | Merge insights, detect anomalies, derive implications | Insight Map |
| 5. QA & Contradiction Testing | Internal validation by skeptic agents | QA Log |
| 6. Report Generation | Final report with citations and strategic implications | Dossier (JSON/PDF) |

---

## 📊 Research Output Schema

```json
{
  "research_intent": "Competitive Landscape Audit",
  "generated_by": "StrategIQ CRE",
  "timestamp": "2025-12-17T10:00Z",
  "sections": [
    "Executive Summary",
    "Market Context",
    "Competitor Map",
    "Positioning Matrix",
    "Pricing and Offer Analysis",
    "Moats and Blindspots",
    "Behavioral Insights",
    "Technology Stack Review",
    "Recommendations"
  ],
  "metadata": {
    "confidence_score": 0.87,
    "qa_approved": true,
    "evidence_citations": 47
  }
}
````

---

## 🧩 Integration with StrategIQ OS

The **CRE** integrates seamlessly through the **Research Router** inside StrategIQ OS:

```
[StrategIQ OS Core]
   ↓
[Orchestration Engine]
   ↓
[Research Supervisor Agent]
   ↓
[Competitive Research Engine (CRE)]
   ↓
[Evidence Scoring Model] + [Signal Aggregator]
   ↓
[Insight Synthesizer]
   ↓
[QA Gate] → [Final Report]
```

Reports are then passed to:

* **Growth Strategist** → For market expansion decisions
* **Marketing Systems Architect** → For messaging and differentiation
* **Product Manager** → For roadmap and feature prioritization

---

## 🧠 Research Scope and Taxonomy

| Category                     | Description                            | Example Output         |
| ---------------------------- | -------------------------------------- | ---------------------- |
| **Market Reality**           | Demand, behavior, spending patterns    | Market velocity report |
| **User Behavior**            | User pain, adoption, retention trends  | Friction maps          |
| **Competitive Intelligence** | Strengths, weaknesses, gaps            | SWOT insights          |
| **Technical Feasibility**    | Stack efficiency & innovation mapping  | Tech audit             |
| **Risk & Constraint**        | Legal, operational, reputational risks | Risk summary           |

---

## 🧾 Validation Gates

1. **Security & Privacy Gate** → Data classification, consent compliance.
2. **Evidence Integrity Gate** → Minimum trust score 0.75.
3. **Strategic Relevance Gate** → Must influence an upcoming marketing or product decision.
4. **Execution Gate** → QA verified, contradiction-free, ready for handoff.

---

## 🚀 Deployment & Usage Example

### Example Prompt (Inside StrategIQ OS)

```
/research
objective: "Audit top 5 competitors in the AI marketing automation space"
required_outputs: ["Positioning Matrix", "Blindspot Report", "Pricing Table"]
constraints: ["Evidence-backed only", "Exclude unverified claims"]
```

Expected Output:

> A detailed report highlighting unseen strategic gaps and moats, verified by the QA Gate.

---

## 🧩 Final Note

StrategIQ Competitive Research Engine (CRE) is **not a scraper or summarizer**.
It is a **decision intelligence system** built to **find what everyone else misses**.

---

© StrategIQ OS by OpenOps Studio | Created by Mamdouh Aboammar
[LinkedIn: https://www.linkedin.com/in/mamdouh-aboammar](https://www.linkedin.com/in/mamdouh-aboammar)

```

