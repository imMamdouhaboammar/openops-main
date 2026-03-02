# OUT-05: AEO Dashboard & Monitoring Setup

**Output Specification**
**Version**: 2.0

---

## Purpose

Provide ready-to-implement dashboard and measurement setup for tracking AEO success.

---

## Dashboard Components

### 1. Citation Tracking Dashboard

**Metrics**:
- Monthly citations (target by engine)
- Citation sources (Perplexity, ChatGPT, etc.)
- Citation growth trend
- Traffic from citations

**Implementation**:
- Google Sheets template provided
- Daily manual checks (or API integration)
- UTM tracking setup
- Weekly summaries

### 2. Authority Metrics Dashboard

**Metrics**:
- Domain authority trend
- Backlink count growth
- Referring domains
- Trust flow

**Tools**:
- Ahrefs or SEMrush (weekly exports)
- Google Search Console
- Internal tracking

### 3. Content Performance Dashboard

**Metrics**:
- Pages optimized count
- Schema markup coverage
- Organic traffic by content
- Conversion rate by source

**Implementation**:
- Google Analytics 4
- Search Console integration
- Custom events tracking

### 4. KPI Summary Dashboard

**Primary KPIs**:
- Monthly citations (target: 8)
- Citation traffic (target: 500)
- Authority growth (target: +5)
- Organic growth (target: +10%)

**Secondary KPIs**:
- Content depth score
- Schema coverage
- Link velocity
- Brand mentions

---

## Weekly Review Template

```markdown
# Weekly AEO Review - Week of [Date]

## Citations This Week
- Perplexity: X citations
- ChatGPT: Y citations
- Google SGE: Z citations
- Total: X+Y+Z

## Traffic Attribution
- From citations: X visits
- Attribution confidence: High/Medium/Low
- Top converting queries: [list]

## Authority Metrics
- Domain authority: [current]
- New backlinks: [count]
- Referring domains: [count]

## Content Performance
- Pages published: X
- Pages optimized: Y
- Schema coverage: Z%

## Action Items
- [ ] Action 1
- [ ] Action 2
- [ ] Action 3

## Notes
[Add observations and adjustments needed]
```

---

## Monthly Analysis Template

```markdown
# Monthly AEO Analysis - [Month]

## KPI Performance

| KPI | Target | Actual | Status |
|-----|--------|--------|--------|
| Monthly Citations | 8 | X | ✅/❌ |
| Citation Traffic | 500 | X | ✅/❌ |
| Authority Growth | +5 | X | ✅/❌ |
| Organic Growth | +10% | X% | ✅/❌ |

## Learnings
- What worked well
- What needs improvement
- Surprises or blockers

## Next Month Focus
- Priority 1
- Priority 2
- Priority 3

## Budget & Resources
- Time invested: X hours
- Tools cost: $X
- Team capacity: X people
- Needed changes: [list]
```

---

## A/B Testing Framework

### Test Template

```yaml
Test Name: Content Format Comparison
Hypothesis: Step-by-step format gets cited more than narrative
Query: "How to set up analytics"

Group A (Control):
  Format: Narrative
  Word count: 2500
  Duration: 2 weeks
  Metric: Citation rate

Group B (Test):
  Format: Step-by-step
  Word count: 2500
  Duration: 2 weeks
  Metric: Citation rate

Success Criteria: 20% increase in citations
```

### Running Tests

**Content Tests**:
- Answer format (list vs narrative)
- Length variants (1000 vs 2500 vs 4000 words)
- Schema types (FAQ vs HowTo)
- CTA variations

**Technical Tests**:
- Schema markup types
- JSON-LD formatting
- Rich result types
- Structured data variations

---

## Monitoring Tools

| Tool | Purpose | Cost | Setup Time |
|------|---------|------|-----------|
| Google Sheets | Dashboard | Free | 1 hour |
| Google Analytics 4 | Traffic tracking | Free | 2 hours |
| Search Console | Query tracking | Free | 1 hour |
| Ahrefs/SEMrush | Authority metrics | $99-199/mo | 1 hour |
| Perplexity API | Citation monitoring | $20/mo | 2 hours |

---

## Getting Started

1. **Create dashboards** (2 hours)
   - Copy Google Sheets template
   - Set up GA4 events
   - Configure Search Console

2. **Set up UTM tracking** (1 hour)
   - Define UTM parameters
   - Document in shared sheet
   - Train team

3. **Start monitoring** (ongoing)
   - Daily: Check Perplexity/ChatGPT manually
   - Weekly: Fill review template
   - Monthly: Complete analysis

4. **Run first A/B test** (week 2)
   - Pick low-risk test
   - Run for 2 weeks
   - Analyze results
   - Document learnings

---

## Success Indicators

✅ Dashboard updated weekly
✅ Trends visible by week 2
✅ A/B tests running by week 3
✅ First optimization by week 4
✅ Scaled approach by week 8

---

**Status**: Ready to implement
