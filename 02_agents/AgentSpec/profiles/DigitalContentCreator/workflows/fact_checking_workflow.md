# Fact-Checking Workflow

## 🎯 Purpose

Systematic verification of factual claims in creative content to prevent hallucination while maintaining creativity.

---

## 📋 Workflow Steps

### Step 1: Extract Claims

**Action:** Identify all factual statements in the content

**What to Extract:**

- Statistics and numbers
- Product features/specifications
- Brand information
- Competitive claims
- Testimonials
- Awards/recognition
- Performance metrics
- Availability/pricing

**Output:** List of all factual claims

---

### Step 2: Categorize Content

**Action:** Classify each element as Creative or Factual

**Creative Elements:**

- ✅ Storytelling narratives
- ✅ Metaphors and analogies
- ✅ Emotional language
- ✅ Humor and exaggeration (when obvious)
- ✅ Hypothetical scenarios (labeled)
- ✅ Creative descriptions

**Factual Elements:**

- 📊 Statistics
- 📋 Product features
- 🏢 Brand information
- 💰 Prices
- 🏆 Awards
- 📈 Performance data
- 🔍 Competitive comparisons

**Output:** Categorized list

---

### Step 3: Verify Factual Claims

**Action:** Check each factual claim against evidence sources

**Verification Process:**

#### For Statistics

1. Check evidence tier (must be Tier A/B)
2. Verify recency (<90 days for platform-specific)
3. Confirm 2+ independent sources
4. Document source URLs/citations

#### For Brand Information

1. Check official brand sources
2. Verify against brand website
3. Confirm via official social media
4. Document source

#### For Product Claims

1. Check product documentation
2. Verify official specifications
3. Confirm features exist
4. Document source

#### For Competitive Claims

1. Require Tier A sources
2. Need 3+ confirmations
3. Use independent verification
4. Document all sources

---

### Step 4: Flag Unverified Claims

**Action:** Mark claims that cannot be verified

**Flagging Categories:**

**🔴 Critical - Must Remove/Verify:**

- Invented statistics
- Fake testimonials
- Fabricated features
- False competitive claims
- Made-up awards

**🟡 Warning - Needs Confirmation:**

- Outdated information (>90 days)
- Single-source claims
- Assumptions presented as facts
- Unverified brand info

**🟢 OK - Verified:**

- Multiple Tier A/B sources
- Recent data
- Official documentation
- Clear evidence trail

**Output:** Flagged claims list with severity

---

### Step 5: Handle Unverified Claims

**Action:** Resolve each flagged claim

**Resolution Options:**

#### Option 1: Provide Evidence

- Find Tier A/B sources
- Document citations
- Update claim if needed
- Mark as verified

#### Option 2: Rephrase as Creative

- Convert to metaphor/analogy
- Add "imagine if..." framing
- Label as hypothetical
- Make exaggeration obvious

#### Option 3: Remove Claim

- Delete unverifiable statement
- Rewrite without claim
- Maintain message without fabrication

#### Option 4: Ask User

- Request information from user
- Get user to verify
- Obtain documentation
- Wait for confirmation

**Never:** Guess, assume, or fabricate

---

### Step 6: Document Sources

**Action:** Create source documentation for all factual claims

**Documentation Format:**

```
Claim: [Factual statement]
Source: [URL or citation]
Tier: [A/B/C]
Date: [Access date]
Verification: [How verified]
```

**Example:**

```
Claim: "Instagram Reels can be 15-90 seconds long"
Source: https://help.instagram.com/270963803047681
Tier: A (Official platform documentation)
Date: 2026-02-15
Verification: Direct from Instagram Help Center
```

---

## 🔍 Verification Checklist

Before approving content, confirm:

- [ ] All statistics have Tier A/B sources
- [ ] All brand info verified from official sources
- [ ] All product claims documented
- [ ] No forbidden fabrications present
- [ ] Creative elements clearly labeled
- [ ] Outdated info flagged with dates
- [ ] Assumptions stated as assumptions
- [ ] All sources documented

---

## 🚨 Red Flags

**Immediately flag these patterns:**

- "Studies show..." (without citation)
- "X% of customers..." (without data)
- "Ranked #1..." (without verification)
- "Award-winning..." (without proof)
- "Customers say..." (without real testimonials)
- "Better than..." (without evidence)
- "Only brand that..." (without verification)

---

## ✅ Examples

### Example 1: Statistics

**Original:** "85% of users see results in 2 weeks"

**Verification:**

- ❌ No source provided
- ❌ Specific percentage requires evidence
- 🔴 **CRITICAL FLAG**

**Resolution:**

- Option 1: Provide clinical study citation
- Option 2: Rephrase: "Many users report seeing results within weeks"
- Option 3: Remove claim entirely

**Chosen:** Option 2 (no evidence available)

---

### Example 2: Product Feature

**Original:** "Our cream contains retinol"

**Verification:**

- ✅ Check ingredient list
- ✅ Verify product documentation
- ✅ Confirm on official website
- 🟢 **VERIFIED**

**Resolution:** Keep as is, document source

---

### Example 3: Competitive Claim

**Original:** "Better absorption than leading brands"

**Verification:**

- ❌ No comparative study cited
- ❌ "Leading brands" not specified
- 🔴 **CRITICAL FLAG**

**Resolution:**

- Option 1: Provide independent lab test results
- Option 2: Rephrase: "Designed for optimal absorption"
- Option 3: Remove claim

**Chosen:** Option 2 (no evidence available)

---

## 🎨 Creative Content Guidelines

**Allowed WITHOUT verification:**

✅ **Storytelling:**
"Imagine waking up with glowing skin..."
(Clearly creative, not a claim)

✅ **Metaphors:**
"Like a spa day in a bottle"
(Obviously metaphorical)

✅ **Emotional Language:**
"Feel confident and beautiful"
(Subjective experience)

✅ **Hypothetical:**
"What if you could reduce your routine to 3 steps?"
(Clearly hypothetical)

**NOT allowed without verification:**

❌ "Clinical studies prove..."
❌ "Dermatologist-recommended"
❌ "Reduces wrinkles by 50%"
❌ "Trusted by 10,000+ customers"

---

## 🛡️ Anti-Hallucination Principles

1. **When in doubt, ask user** - Never guess
2. **Label creative clearly** - Distinguish from factual
3. **Verify before claiming** - Evidence first
4. **Document everything** - Source all facts
5. **Remove if unverifiable** - Don't fabricate to fill gaps

---

## 📊 Integration with Quality Gates

This workflow runs as part of the **Evidence Gate** in Quality Assurance:

**Stage 6: Quality Assurance**

- Clarity Gate
- Brand Alignment Gate
- Audience Relevance Gate
- Platform Optimization Gate
- Cultural Appropriateness Gate
- **Evidence Gate** ← Fact-checking workflow runs here

**Blocking:** Content cannot proceed to delivery if fact-checking fails

---

## 🔄 Continuous Improvement

**After each project:**

- Review flagged claims
- Identify common patterns
- Update verification guidelines
- Improve source database
- Refine flagging criteria
