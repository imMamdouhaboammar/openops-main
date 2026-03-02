# Grounding Sources Reference — Trust Tiers & Independence Groups

## Trust Tier Definitions

- **Tier A**: Primary/official docs or standards bodies (score ≥ 0.88)
- **Tier B**: Reputable research/outlets or major vendors (score 0.78–0.90)
- **Tier C**: Practitioner sources — credible but may be biased
- **Tier D**: Community/qualitative — weak evidence, never sufficient alone

## Evidence Rules

- Key recommendations require ≥3 independent confirmations from different independence groups
- Reddit does NOT count as independent confirmation
- Multiple pages from the same vendor/domain do NOT count as independent confirmations

---

## Tier A — Official Platform Documentation

| ID | Source | Category | Independence Group |
|----|--------|----------|-------------------|
| src_google_search_central | Google Search Central | SEO | google |
| src_google_ads_help | Google Ads Help | Paid Media | google |
| src_google_ads_api | Google Ads API Docs | Paid Media | google |
| src_ga4_docs | Google Analytics (GA4) | Analytics | google |
| src_ga4_measurement_protocol | GA4 Measurement Protocol | Analytics | google |
| src_gtm_docs | Google Tag Manager | Tracking | google |
| src_search_console_docs | Google Search Console | SEO | google |
| src_meta_business_help | Meta Business Help Center | Paid Media | meta |
| src_meta_marketing_api | Meta Marketing API | Paid Media | meta |
| src_tiktok_business_help | TikTok Ads Help Center | Paid Media | tiktok |
| src_linkedin_marketing_help | LinkedIn Marketing Solutions | Paid Media | linkedin |
| src_linkedin_api_docs | LinkedIn API (Microsoft Learn) | Paid Media | linkedin |
| src_microsoft_ads_docs | Microsoft Advertising Docs | Paid Media | microsoft |

## Tier A — Regional Official Sources (Egypt + GCC)

| ID | Source | Category | Independence Group |
|----|--------|----------|-------------------|
| src_egypt_capmas | Egypt CAPMAS | Regional Statistics | egypt_gov |
| src_saudi_cst | Saudi CST | Regulatory | saudi_gov |
| src_uae_open_data | UAE Open Data Portal (FCSC) | Regional Statistics | uae_gov |
| src_saudi_vision_2030 | Saudi Vision 2030 | National Strategy | saudi_gov |

## Tier A — Analytics Vendors

| ID | Source | Category | Independence Group |
|----|--------|----------|-------------------|
| src_mixpanel_docs | Mixpanel Documentation | Product Analytics | mixpanel |
| src_amplitude_docs | Amplitude Developer Docs | Product Analytics | amplitude |
| src_posthog_docs | PostHog Documentation | Product Analytics | posthog |

## Tier B — Research & Practitioner Sources

| ID | Source | Category | Independence Group |
|----|--------|----------|-------------------|
| src_think_with_google | Think with Google | Research | research_outlets |
| src_iab | IAB | Standards | standards_bodies |
| src_warc | WARC | Research | research_outlets |
| src_insider_intelligence | Insider Intelligence (eMarketer) | Research | research_outlets |
| src_mckinsey | McKinsey Insights | Research | consulting |
| src_deloitte | Deloitte Digital | Research | consulting |

## Tier B — GitHub (Implementation Patterns)

| ID | Source | Category | Independence Group |
|----|--------|----------|-------------------|
| src_github_growthbook | GrowthBook | Experimentation | github_oss |
| src_github_lightweight_mmm | LightweightMMM (Google) | Attribution/MMM | github_oss |
| src_github_robyn | Robyn (Meta) | Attribution/MMM | github_oss |
| src_github_snowplow | Snowplow | Tracking | github_oss |

## Tier D — Community (Qualitative Only)

| ID | Source | Category | Independence Group |
|----|--------|----------|-------------------|
| src_reddit_ppc | Reddit r/PPC | Community | reddit |
| src_reddit_seo | Reddit r/SEO | Community | reddit |

---

## Recency Policy

- **120-day decay** for time-sensitive claims (linear to floor score 0.20)
- **Platform-specific claims** always require recent docs
- **Timeless exceptions** (bypass decay): experiment design, segmentation principles, positioning fundamentals, offer clarity, copywriting principles, funnel diagnostics, measurement principles
