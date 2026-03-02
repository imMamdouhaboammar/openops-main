# Security Architecture Review Workflow

**Workflow ID**: `security-architecture-review`  
**Version**: 1.0.0  
**Type**: Standard  
**Duration**: 2-4 hours  
**Triggers**: Design complete, Architecture change, Manual request

---

## Overview

Comprehensive security review of system architecture to identify vulnerabilities, validate security controls, and ensure compliance with organizational standards and industry best practices.

---

## Prerequisites

- [ ] Architecture diagrams available (system, network, data flow)
- [ ] Component specifications documented
- [ ] Data classification defined
- [ ] Compliance requirements identified
- [ ] Stakeholders identified (architects, developers, security team)

---

## Workflow Steps

### Phase 1: Preparation & Discovery (30 min)

#### Step 1.1: Gather Architecture Documentation

```yaml
inputs:
  - Architecture diagrams (Lucidchart, Draw.io, Visio)
  - Component descriptions
  - Data flow diagrams
  - Integration points
  - Technology stack details
```

#### Step 1.2: Identify Security Requirements

- Applicable compliance frameworks (NIST, ISO 27001, OWASP)
- Data classification levels
- Threat landscape specifics
- Risk appetite level (conservative, moderate, aggressive)

#### Step 1.3: Define Review Scope

```markdown
In-Scope:
- Architecture components: [list]
- Trust boundaries: [list]
- Data flows: [list]
- External integrations: [list]

Out-of-Scope:
- Components not in this iteration: [list]
- Future planned features: [list]
```

---

### Phase 2: Threat Modeling (60 min)

#### Step 2.1: Run STRIDE Analysis

**Tool**: `threat-model-generator`

```json
{
  "architecture_doc": "file://architecture.drawio",
  "system_scope": {
    "components": [...],
    "data_flows": [...],
    "trust_boundaries": [...]
  },
  "threat_categories": ["Spoofing", "Tampering", "Repudiation", "Information_Disclosure", "Denial_of_Service", "Elevation_of_Privilege"]
}
```

**Output**: Comprehensive threat catalog with risk scores

#### Step 2.2: Validate and Prioritize Threats

- Review auto-generated threats for accuracy
- Add domain-specific threats not caught by automation
- Risk score validation (Likelihood × Impact)
- Priority ranking (Critical → Low)

#### Step 2.3: Document Threat Model

```markdown
## Threat Model Summary
- Total Threats Identified: [count]
- Critical: [count]
- High: [count]
- Medium: [count]
- Low: [count]
- Aggregate Risk Score: [score]
```

---

### Phase 3: Architecture Analysis (45 min)

#### Step 3.1: Trust Boundary Analysis

For each trust boundary:

- [ ] Clearly defined and documented
- [ ] Appropriate security controls at boundary
- [ ] Authentication required for crossing
- [ ] Authorization enforced
- [ ] Logging/monitoring in place

#### Step 3.2: Data Flow Security

For each data flow:

- [ ] Data classification appropriate
- [ ] Encryption in transit (TLS 1.3+)
- [ ] Encryption at rest (AES-256) if sensitive
- [ ] Access control enforced
- [ ] Integrity protection (signatures/hashes)

#### Step 3.3: Authentication & Authorization

- [ ] Multi-factor authentication (MFA) for sensitive operations
- [ ] Strong password policy enforced
- [ ] OAuth 2.1 / OpenID Connect for APIs
- [ ] Role-Based Access Control (RBAC) implemented
- [ ] Least privilege principle followed
- [ ] Session management secure (timeouts, secure cookies)

#### Step 3.4: Secrets Management

- [ ] No hardcoded secrets in code/config
- [ ] Secrets stored in vault (HashiCorp Vault, AWS Secrets Manager)
- [ ] Secrets rotated regularly (90 days max)
- [ ] Secrets access logged and audited

#### Step 3.5: Logging & Monitoring

- [ ] Comprehensive audit logs for security events
- [ ] Logs immutable and tamper-evident
- [ ] Real-time alerting for anomalies
- [ ] Log retention policy defined (7 years for compliance)
- [ ] SIEM integration (Splunk, Elastic Security)

---

### Phase 4: Compliance Validation (30 min)

#### Step 4.1: Run Compliance Checker

**Tool**: `compliance-checker`

```json
{
  "target_system": "system-id",
  "frameworks": ["NIST-CSF", "ISO-27001", "OWASP-ASVS-L2"],
  "evidence_directory": "s3://compliance-evidence/"
}
```

**Output**: Compliance scorecard with gaps

#### Step 4.2: Gap Analysis

For each non-compliant control:

- Document current state
- Identify gap
- Recommend remediation
- Estimate effort
- Assign priority

#### Step 4.3: Generate Compliance Report

```markdown
## Compliance Status
| Framework | Score | Status | Critical Gaps |
|-----------|-------|--------|---------------|
| NIST CSF  | 87%   | 🟡     | 3             |
| ISO 27001 | 92%   | 🟢     | 0             |
| OWASP ASVS| 79%   | 🔴     | 5             |
```

---

### Phase 5: Control Recommendations (30 min)

#### Step 5.1: Map Threats to Controls

**Tool**: `security-control-mapper`

```json
{
  "threats": [...],
  "frameworks": ["NIST-800-53", "CIS-Controls"],
  "prioritization": "risk_based"
}
```

**Output**: Prioritized list of security controls

#### Step 5.2: Create Remediation Roadmap

```markdown
## Security Enhancement Roadmap

### Phase 1: Critical (0-30 days)
- [ ] Implement MFA for admin accounts
- [ ] Fix broken access control in API endpoints
- [ ] Enable encryption at rest for database

### Phase 2: High (30-90 days)
- [ ] Implement API rate limiting
- [ ] Set up WAF with OWASP Core Rule Set
- [ ] Deploy SIEM with real-time alerting

### Phase 3: Medium (90-180 days)
- [ ] Microsegmentation of internal network
- [ ] Implement Zero Trust architecture
- [ ] Advanced threat detection with ML
```

---

### Phase 6: Reporting & Sign-Off (30 min)

#### Step 6.1: Generate Architecture Security Report

**Template Structure**:

1. Executive Summary
2. Architecture Overview
3. Threat Model Summary
4. Findings (by severity)
5. Remediation Roadmap
6. Compliance Status
7. Recommendations

#### Step 6.2: Stakeholder Review

- Present findings to architecture team
- Discuss trade-offs and priorities
- Get consensus on remediation plan
- Document decisions in Architecture Decision Records (ADRs)

#### Step 6.3: Approval Gate

**Approval Criteria**:

- [ ] Zero critical unmitigated threats
- [ ] < 3 high severity threats with documented mitigation plans
- [ ] Compliance gaps have remediation timeline
- [ ] All stakeholders have reviewed and acknowledged

**Sign-Off**:

- Security Architect: ___________
- Staff Engineer: ___________
- Product Manager: ___________
- Date: ___________

---

## Outputs

### Deliverables

1. **Threat Model Document** (`threat-model-[system]-[date].md`)
2. **Architecture Security Assessment Report** (`security-review-[system]-[date].pdf`)
3. **Remediation Roadmap** (`remediation-roadmap-[system]-[date].md`)
4. **Compliance Scorecard** (`compliance-[system]-[date].json`)

### Artifacts Stored In

- Git repository: `/docs/security/architecture-reviews/`
- Confluence/SharePoint: Security Architecture space
- JIRA: Remediation tasks created as tickets

---

## Success Metrics

- **Completion Time**: < 4 hours for standard system
- **Threat Coverage**: > 95% of components analyzed
- **Approval Rate**: First-time approval > 80%
- **Remediation Tracking**: 100% of findings have JIRA tickets

---

## Automation Opportunities

- [ ] Auto-generate threat model from IaC (Terraform, CloudFormation)
- [ ] Automated compliance scanning in CI/CD
- [ ] Auto-create JIRA tickets for findings
- [ ] Slack notifications for review completion

---

**Workflow Owner**: Security Architect Agent  
**Last Updated**: 2026-01-10  
**Next Review**: 2026-04-10
