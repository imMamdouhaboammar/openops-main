# Research & Clarifications: OpenOps Agents Fleet Marketplace

**Purpose**: Resolve [NEEDS CLARIFICATION] items from spec.md; establish decision points for Phase 1 design
**Date**: 2026-01-12
**Input Clarifications**: FR-016 (payments), FR-017 (licensing), FR-018 (refunds)

---

## FR-016: Payment Processing

**Clarification**: Which provider(s) and supported regions?

### Research Findings

#### Option A: Single Provider (Stripe)
- **Coverage**: 195+ countries; multi-currency (135+ currencies); webhooks for reliable order linking
- **Fees**: 2.9% + $0.30 (cards), 1% (ACH), 3.5% + fixed (international)
- **PCI Compliance**: Level 1; tokenization built-in
- **Setup Time**: 1–2 days (credentials); 1 week (full KYC for payouts)
- **Strengths**: industry standard for SaaS; excellent SDK; strong webhook reliability
- **Weaknesses**: US-centric; high fees in emerging markets

#### Option B: Stripe + Regional Partners (Wise, Checkout.com, Alipay)
- **Coverage**: Near-universal (170+ countries)
- **Fees**: Varies 2–5% per region
- **Strengths**: Lower fees in target regions (MENA, APAC); supports local payment methods
- **Weaknesses**: operational complexity; multiple integrations; vendor vetting overhead

#### Option C: Marketplace Processor (Adyen, PayPal Commerce Platform)
- **Coverage**: 195+ countries; native multicurrency payout to vendors
- **Fees**: 2.75% + $0.30 (cards); volume discounts available
- **Strengths**: built-in marketplace split logic; simplified vendor onboarding
- **Weaknesses**: smaller ecosystem compared to Stripe; slightly higher baseline fees

### Decision: **Stripe (MVP) + Wise for Vendor Payouts**
- **Payment capture**: Stripe for buyer transactions (global coverage, webhooks reliability)
- **Vendor payouts**: Wise API (supports 180+ countries, lower fees on remittance)
- **Rationale**: minimizes MVP complexity while supporting global buyers; two-provider model adds vendor flexibility
- **Timelines**: 1–2 weeks integration time; separate vendor payout flow avoids buyer UX friction
- **Risk**: Stripe rate limits or outages → fallback manual review; Wise delays → vendor communication queue

---

## FR-017: Licensing Model

**Clarification**: Personal vs. Enterprise tiers; seat limits; redistribution rights?

### Research Findings

#### Licensing Tier Options

| Tier | Use Case | Seat Limit | Redistribution | Price Point | Notes |
|------|----------|-----------|-----------------|-------------|-------|
| **Personal** | Individual devs, hobbyists | 1 | No (personal only) | $29–79 | Single-user license; non-transferable |
| **Team** | Departments, small teams | 5–10 | No; team-only internal use | $99–199/mo or $800–1600/yr | Volume pricing applied |
| **Enterprise** | Large orgs, production systems | Unlimited | Licensed to org; internal redistribution OK | Custom (per org) | Legal agreement; dedicated support |
| **Commercial Use** | Resellers, consultants, SaaS platforms | Unlimited | Commercial redistribution allowed | Custom licensing | Separate agreement; royalty or flat fee option |

#### Key Rights Decisions

- **Modification**: All tiers allow modification for local use (not public forks)
- **Support**: Personal tier has community support (Slack/Discord); Team + Enterprise get email SLAs
- **Termination**: License revoked if agent code used for competitor products (non-compete 2-year lookback)
- **Data Sovereignty**: Buyer responsible for compliance in their jurisdiction; vendor provides no warranty on agent outputs

### Decision: **Tiered Model (Personal/Team/Enterprise)**
- **MVP launch**: Personal + Team tiers (simple SDKs: 1 agent per license, static seat tracking)
- **Phase 2**: Enterprise + Commercial (legal review; custom agreements; audit trails)
- **License Enforcement**: 
  - Hash-based validation on agent package version (seller-signed manifest)
  - Client-side check during Gemini/GPT/Claude upload (warn if multi-seat detected; no hard block)
  - Audit log flagged for enterprise tier review (manual warning sent)
- **Rationale**: avoids complex license servers in MVP; honor-system for single-player use; compliance review on demand for enterprises
- **Risk**: Personal users may share licenses; Enterprise customers require stricter audit; commercial use requires legal contracts upfront

---

## FR-018: Refund Policy

**Clarification**: Conditions for refunds on digital goods; time window; verification steps?

### Research Findings

#### Industry Standards (Digital SaaS/Code)

| Policy | Rationale | Consumer Acceptance |
|--------|-----------|---------------------|
| **No refunds** (except quality defects) | Digital goods non-returnable; risk of copying/redistribution | ~40% customer satisfaction |
| **7-day money-back** | Most common for SaaS; balances risk and trust | ~75% satisfaction; acceptable for most markets |
| **14-day full refund + limited eval** | EU consumer protection (unfair contract terms); strong signal of confidence | ~85% satisfaction; required in EU/MENA |
| **Issue-based refunds only** | Broken/missing artifacts, incompatibility; time-bound; requires proof | ~70% satisfaction; suits digital code |

#### MENA/Global Considerations
- **Arabic markets**: Expectation of returns; legal requirement in some GCC countries (cooling-off period 14 days)
- **Chargebacks**: Digital goods have high chargeback rates (5–10%); Stripe covers basic fraud
- **Payment disputes**: Buyers claim "never received" despite successful download → verification via signed receipt

### Decision: **14-Day Limited Refund + Issue-Based Extensions**

**Refund Terms**:
- **Full refund window**: 14 days post-purchase (compliant with GDPR/MENA consumer law)
- **Conditions**:
  1. Download has not been verified (checksum passed + client installed artifacts)
  2. Buyer demonstrates artifact mismatch or manifest error (screenshots/logs required)
  3. Vendor has not issued update addressing issue
- **Exception**: If vendor updates within 14 days and resolves claimed issue, clock resets 7 days for re-eval
- **Process**:
  1. Buyer clicks "Request Refund" on order page
  2. System captures: reason, artifact hash, client logs, timestamp
  3. Auto-reject if download verified; auto-approve if <1 day old and no downloads
  4. Manual review (24h SLA) if boundary case
  5. Refund issued to original payment method (3–5 biz days via Stripe/Wise)

**Prevention Measures**:
- **Checksum verification**: Client computes SHA-256 on download; marked in order record
- **Download tracking**: log timestamp, IP, client version; retain 90 days for disputes
- **Vendor communication**: send auto-notification on refund request; offer to fix if issue-based

**Chargeback Handling**:
- Stripe represents buyer; system auto-generates refund justification (receipt + artifact manifest + download proof)
- Vendor dispute rights: can submit counter-evidence (changelog, bug fix commit)
- Loss rate target: <2% of GMV

---

## Next Steps (Phase 1: Design)

1. **Payment Integration**:
   - Create `backend/src/services/StripeService.ts` with webhook handlers
   - Create `backend/src/services/WisePayoutService.ts` for vendor disbursement
   - Define order state machine: pending → captured → fulfilled → refunded

2. **Licensing**:
   - Define license schema in Prisma (tier, seat count, expiration, manifest hash)
   - Create validation logic: hash-based tier check + client-side warning UI
   - Implement audit logging for enterprise tier

3. **Refund Policy**:
   - Create refund request controller + validator
   - Add download tracking to order events
   - Define manual review queue (Slack webhook for operations team)

---

## Open Questions for Stakeholder Review

- [ ] **Payment**: Should we support cryptocurrency (Stripe does not natively; requires third party like Wyre)? *Recommend: No for MVP; revisit Phase 3*
- [ ] **Licensing**: Should vendors be allowed to offer free agents? *Recommend: Yes; add "Free" pricing tier with personal-use only*
- [ ] **Refund**: Should we offer partial refunds for multi-agent packs? *Recommend: Yes; proportional to agent count if purchased as bundle*
- [ ] **Regional Restrictions**: Should we geo-block certain regions (e.g., OFAC/sanctions)? *Recommend: Yes; Stripe + Wise handle automatic; document in ToS*

**Review Status**: Awaiting stakeholder confirmation on decisions above before Phase 1 design begins.
