# Growth Marketing - Core Capabilities

**Version**: 1.0.0  
**Last Updated**: 2026-01-10

---

## Overview

Core capabilities represent the foundational growth marketing functions essential for driving sustainable, data-driven growth.

---

## 1. AARRR Funnel Analysis & Optimization {#aarrr-funnel}

### Description

Systematic analysis and optimization of the entire customer journey using the AARRR (Pirate Metrics) framework.

### Five Stages

#### Acquisition

**Goal**: Drive qualified traffic to your product

**Key Metrics**:

- Total visitors (unique, sessions)
- Traffic by source (Organic, Paid, Referral, Direct, Social)
- Cost Per Acquisition (CPA) by channel
- Click-Through Rate (CTR)
- Bounce Rate

**Optimization Tactics**:

- SEO content clusters for organic traffic
- Paid ad campaign optimization (Google Ads, Facebook, LinkedIn)
- Referral program incentives
- Content marketing (blog, videos, podcasts)
- Community engagement (Reddit, Discord, Product Hunt)

#### Activation

**Goal**: Deliver "Aha Moment" - users realize product value

**Key Metrics**:

- Activation Rate (% completing key action within X days)
- Time-to-Value (TTV)
- Onboarding Completion Rate
- Feature Adoption Rate

**Optimization Tactics**:

- Streamlined sign-up (email-only, social login)
- Interactive product tours (Appcues, Pendo)
- Empty state design with clear CTAs
- Progressive onboarding (don't overwhelm)
- Personalized onboarding paths

#### Retention

**Goal**: Keep users engaged and coming back

**Key Metrics**:

- Day 1, Day 7, Day 30, Day 90 Retention
- Monthly/Annual Churn Rate
- Stickiness (DAU/MAU ratio)
- Session Frequency & Duration

**Optimization Tactics**:

- Email drip campaigns (welcome, engagement, win-back)
- Push notifications (behavioral triggers)
- In-app engagement loops (streaks, achievements)
- Loyalty/rewards programs
- Proactive customer success outreach

#### Revenue

**Goal**: Monetize users effectively

**Key Metrics**:

- Average Revenue Per User (ARPU)
- Customer Lifetime Value (CLV)
- LTV:CAC Ratio (target > 3:1)
- Expansion Revenue Rate
- Net Revenue Retention (NRR, target > 100%)

**Optimization Tactics**:

- Pricing optimization (A/B test tiers)
- Self-serve upgrade flows
- Upsell/cross-sell campaigns
- Usage-based pricing models
- Annual plan incentives (2 months free)

#### Referral

**Goal**: Turn users into advocates

**Key Metrics**:

- Net Promoter Score (NPS)
- Viral Coefficient (K-factor, target > 1)
- Referral Conversion Rate
- Referrals per User

**Optimization Tactics**:

- Double-sided incentives (reward both parties)
- Built-in sharing moments (milestones, achievements)
- Social proof automation
- Referral program gamification
- Influencer partnerships

---

## 2. A/B Testing & Experimentation {#ab-testing}

### Description

Rigorous experimental methodology to validate hypotheses and optimize conversion rates across the funnel.

### Experimentation Process

1. **Hypothesis Formation**

   ```
   Format: "If we [change X], then [metric Y] will improve by [Z%] because [reason]"
   
   Example: "If we add social proof testimonials above the fold on the pricing page,
   then conversion rate will improve by 15% because it builds trust with new visitors"
   ```

2. **Test Design**
   - **Control**: Current version (baseline)
   - **Treatment(s)**: One or more variants
   - **Sample Size**: Use power analysis calculator
   - **Duration**: Minimum 1-2 weeks, account for weekly cycles
   - **Success Metric**: Primary (e.g., conversion rate) + Secondary (e.g., engagement)

3. **Implementation**
   - Tools: VWO, Optimizely, AB Tasty, Google Optimize
   - Feature flags for backend tests
   - Event tracking validation (QA phase)

4. **Statistical Analysis**
   - **Significance Level**: p-value < 0.05 (95% confidence)
   - **Statistical Power**: 80% minimum
   - **Avoid**: Peeking (checking results before completion), HARKing (Hypothesizing After Results are Known)

5. **Decision Making**
   - **Winner**: Statistically significant + positive lift
   - **No Winner**: Not significant or negative lift
   - **Iterate**: Learn from results, generate new hypothesis

### What to Test

- **Landing Pages**: Headlines, CTAs, images, social proof, form fields
- **Pricing Page**: Tiers, pricing amounts, feature lists, trial length
- **Sign-Up Flow**: Number of steps, required fields, social login options
- **Onboarding**: Tutorial steps, tooltips, empty states
- **Emails**: Subject lines, send time, personalization, CTA copy
- **In-App**: Feature placement, nudges, upgrade prompts

### Velocity & Volume

- **Startups**: 15-20 tests/quarter (high learning velocity)
- **Growth Stage**: 30-50 tests/quarter
- **Enterprise**: 100+ tests/quarter (dedicated growth teams)

---

## 3. Analytics & Data Interpretation {#analytics}

### Description

Collect, analyze, and derive actionable insights from product and marketing data.

### Key Analytics Platforms

- **Mixpanel**: Event-based, funnels, retention cohorts, user profiles
- **Amplitude**: Behavioral analytics, user journeys, predictive cohorts
- **Google Analytics 4**: Web traffic, acquisition, e-commerce tracking
- **Heap**: Auto-capture events, session replay, retroactive analysis

### Essential Reports

#### Funnel Analysis

Track drop-off at each stage of a conversion flow

```
Example Signup Funnel:
1. Landing Page View: 10,000 users
2. Clicked "Get Started": 3,500 users (35% conversion) 
3. Filled Email: 2,800 users (80% conversion)
4. Verified Email: 2,100 users (75% conversion)
5. Completed Onboarding: 1,470 users (70% conversion)

Overall Conversion: 14.7%
Biggest Drop-Off: Landing → Get Started (65% drop)
```

#### Cohort Retention

Track how long users stick around, grouped by sign-up period

```
Cohort: January 2026 Sign-Ups
- Day 1 Retention: 85%
- Day 7 Retention: 52%
- Day 30 Retention: 38%
- Day 90 Retention: 25%
```

#### Attribution Modeling

Understand which touchpoints contributed to conversion

- **Last-Click**: Credit to final touchpoint (simple but flawed)
- **First-Click**: Credit to initial touchpoint
- **Linear**: Equal credit to all touchpoints
- **Time-Decay**: More credit to recent touchpoints
- **U-Shaped**: More credit to first & last, less to middle
- **Data-Driven**: ML-based attribution (Google Analytics 4)

### Segmentation

- **Behavioral**: Power users, casual users, inactive users
- **Demographic**: Age, location, company size, industry
- **Firmographic** (B2B): Company revenue, employee count, industry
- **Lifecycle Stage**: Trial, active, churned, winback
- **Value-Based**: High LTV, low LTV, at-risk

---

## 4. Acquisition Channel Optimization {#acquisition}

### Description

Identify, test, and scale the most effective channels for customer acquisition.

### Channel Categories

#### Organic Channels

- **SEO**: Content clusters, keyword targeting, backlinks
- **Content Marketing**: Blog, videos, podcasts, infographics
- **Community**: Reddit, Discord, Slack groups, forums
- **PR**: Media coverage, guest posts, podcasts interviews

#### Paid Channels

- **Google Ads**: Search, Display, YouTube
- **Social Ads**: Facebook, Instagram, LinkedIn, TikTok, Twitter
- **Retargeting**: Pixel-based, list-based
- **Affiliate Marketing**: Commission-based partnerships

#### Referral & Viral

- **Referral Programs**: Dropbox model (extra storage)
- **Viral Loops**: Product usage inherently spreads it (Zoom, Calendly)
- **Influencer Marketing**: Micro-influencers (10K-100K followers)

### Channel Prioritization Framework

**ICE Score**: Impact × Confidence × Ease

- **Impact**: Potential reach and conversion volume
- **Confidence**: How certain are you it will work?
- **Ease**: How quickly can you test it?

### Metrics by Channel

- **SEO**: Organic traffic, keyword rankings, backlinks, domain authority
- **Paid Ads**: CPA, CPC, CTR, ROAS (Return on Ad Spend)
- **Content**: Page views, time on page, social shares, backlinks
- **Referral**: Referral traffic, viral coefficient, conversion rate

---

## 5. Retention & Engagement Optimization {#retention}

### Description

Reduce churn and increase customer lifetime value through systematic engagement.

### Retention Strategies

#### Email Automation

- **Welcome Series**: Day 0, 1, 3, 7 after sign-up
- **Engagement**: Usage tips, feature highlights, case studies
- **Re-Engagement**: Win-back inactive users (30-day, 60-day, 90-day)
- **Transactional**: Order confirmations, password resets, billing

#### Push Notifications

- **Behavioral Triggers**: User completes X, feature usage milestone
- **Re-Engagement**: "You haven't logged in for 7 days"
- **Personalized**: Based on user preferences and behavior
- **Best Practices**: Opt-in required, frequency capping, easy unsubscribe

#### In-App Messaging

- **Tooltips**: Highlight new features
- **Nudges**: Encourage action completion
- **Announcements**: Product updates, webinars, events
- **Surveys**: NPS, feature feedback, exit surveys

#### Loyalty & Rewards

- **Points System**: Earn points for actions, redeem for perks
- **Tiered Programs**: Bronze, Silver, Gold, Platinum
- **Exclusive Access**: Beta features, early releases, VIP support
- **Non-Monetary Rewards**: Badges, status, recognition

### Churn Prediction

Use machine learning to identify at-risk users before they churn:

- **Features**: Login frequency, feature usage, support tickets, NPS score
- **Model**: Logistic regression, random forest, gradient boosting
- **Action**: Proactive outreach from customer success team

---

## Capability Maturity Model

| Capability | Level 1 (Basic) | Level 2 (Intermediate) | Level 3 (Advanced) | Level 4 (Expert) |
|------------|-----------------|------------------------|---------------------|-------------------|
| AARRR Funnel | Manual tracking | Automated dashboards | Cohort analysis | Predictive modeling |
| A/B Testing | 1-2 tests/quarter | 10+ tests/quarter | 30+ tests/quarter | 100+ tests/quarter |
| Analytics | Vanity metrics | Event tracking | Funnel + Retention | Full attribution |
| Acquisition | 1-2 channels | 3-5 channels | 5+ channels scaled | Omnichannel mastery |
| Retention | Email only | Multi-channel | Automation + ML | Hyper-personalization |

**Current Target**: Level 3 (Advanced) for all core capabilities.

---

**Document Owner**: Growth Marketing Team  
**Review Frequency**: Quarterly  
**Next Review**: 2026-04-10
