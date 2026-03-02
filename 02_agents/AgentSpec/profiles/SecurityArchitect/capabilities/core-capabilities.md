# Security Architect - Core Capabilities

**Version**: 1.0.0  
**Last Updated**: 2026-01-10

---

## Overview

This document defines the core capabilities that the Security Architect agent provides. Core capabilities represent foundational security functions that are essential for any secure system design.

---

## 1. Threat Modeling {#threat-modeling}

### Description

Systematic identification and analysis of potential security threats using industry-standard methodologies to proactively design secure systems.

### Methodologies Supported

- **STRIDE** (Microsoft): Spoof, Tamper, Repudiate, Information Disclosure, Denial of Service, Elevation of Privilege
- **PASTA** (Process for Attack Simulation and Threat Analysis): Business objective-driven threat modeling
- **LINDDUN**: Privacy-focused threat modeling (Linkability, Identifiability, Non-repudiation, Detectability, Disclosure, Unawareness, Non-compliance)
- **VAST**: Visual, Agile, and Simple Threat modeling
- **Attack Trees**: Hierarchical threat decomposition

### Inputs

- System architecture diagrams
- Data flow diagrams (DFDs)
- Component specifications
- User requirements
- Compliance requirements

### Outputs

- Comprehensive threat catalog
- Risk assessment matrix
- Recommended security controls
- Threat model documentation
- Mitigation priority list

### Quality Metrics

- **Coverage**: 95%+ of system components analyzed
- **Accuracy**: 90%+ threat identification rate validated by penetration testing
- **Timeliness**: Threat model delivered within 48 hours of architecture finalization

---

## 2. Architecture Review {#architecture-review}

### Description

Comprehensive evaluation of system architecture against security best practices, standards, and organizational security policies.

### Review Dimensions

1. **Trust Boundaries**: Identification and validation of security perimeters
2. **Data Flows**: Security of data in transit and at rest
3. **Authentication & Authorization**: Access control mechanisms
4. **Encryption**: Cryptographic protections
5. **Logging & Monitoring**: Audit trails and observability
6. **Resilience**: Fault tolerance and disaster recovery
7. **API Security**: Endpoint protection and rate limiting
8. **Supply Chain**: Third-party dependency security

### Standards Applied

- OWASP Application Security Verification Standard (ASVS)
- NIST SP 800-160: Systems Security Engineering
- ISO/IEC 27034: Application Security
- Cloud Security Alliance (CSA) Security Guidance

### Deliverables

- Architecture security assessment report
- Gap analysis against standards
- Security enhancement roadmap
- Architecture decision records (ADRs) for security choices

### Approval Criteria

- Zero critical security gaps
- < 3 high-severity findings with documented mitigation plans
- 100% compliance with mandatory organizational standards

---

## 3. Compliance Validation {#compliance-validation}

### Description

Verification that system design and implementation meet regulatory, industry, and organizational compliance requirements.

### Supported Frameworks

#### Regulatory Compliance

- **GDPR** (General Data Protection Regulation): EU privacy law
- **HIPAA** (Health Insurance Portability and Accountability Act): Healthcare data protection (US)
- **NDMO** (National Data Management Office): Saudi Arabia data regulations
- **PCI-DSS**: Payment Card Industry Data Security Standard

#### Industry Standards

- **NIST Cybersecurity Framework (CSF) 2.0**: Govern, Identify, Protect, Detect, Respond, Recover
- **ISO/IEC 27001:2022**: Information Security Management
- **CIS Controls v8**: 18 critical security controls
- **OWASP SAMM**: Software Assurance Maturity Model

#### Best Practices

- **OWASP Top 10** (2025): Web application security risks
- **OWASP API Security Top 10** (2025): API-specific risks
- **CWE Top 25**: Most dangerous software weaknesses
- **SANS Top 20 Critical Security Controls**

### Validation Process

1. **Gap Analysis**: Current state vs target compliance state
2. **Control Mapping**: Map system controls to framework requirements
3. **Evidence Collection**: Gather artifacts demonstrating compliance
4. **Audit Preparation**: Generate compliance documentation
5. **Continuous Monitoring**: Ongoing compliance tracking

### Outputs

- Compliance scorecard
- Gap remediation plan
- Audit-ready documentation package
- Continuous compliance dashboard

---

## 4. Vulnerability Management {#vulnerability-management}

### Description

Proactive identification, assessment, prioritization, and remediation tracking of security vulnerabilities across the entire technology stack.

### Scanning Capabilities

#### Static Application Security Testing (SAST)

- **Tools**: SonarQube, Checkmarx, Fortify, Semgrep, CodeQL
- **Coverage**: Source code analysis for security flaws
- **Languages**: Java, Python, JavaScript/TypeScript, Go, C/C++, C#, Ruby
- **Integration**: Pre-commit hooks, PR checks, CI/CD gates

#### Dynamic Application Security Testing (DAST)

- **Tools**: OWASP ZAP, Burp Suite, Acunetix, Qualys
- **Coverage**: Runtime vulnerability testing
- **Scope**: Web applications, APIs, cloud services
- **Frequency**: Weekly for staging, daily for dev

#### Software Composition Analysis (SCA)

- **Tools**: Snyk, Dependabot, WhiteSource, OWASP Dependency-Check
- **Coverage**: Third-party library vulnerabilities
- **Databases**: CVE, NVD, GitHub Security Advisories
- **Automation**: Automated PR creation for dependency updates

#### Infrastructure Scanning

- **Tools**: Nessus, OpenVAS, Qualys VMDR
- **Coverage**: Network vulnerabilities, misconfigured services
- **Cloud-Specific**: AWS Inspector, Azure Security Center, GCP Security Command Center

### Vulnerability Lifecycle

1. **Detection**: Automated scanning + manual testing
2. **Validation**: False positive elimination
3. **Assessment**: Risk scoring (CVSS + business context)
4. **Prioritization**: SLA-based remediation timeline
5. **Remediation**: Fix implementation and verification
6. **Verification**: Re-scan to confirm fix
7. **Reporting**: Metrics and trend analysis

### SLAs by Severity

- **Critical (CVSS 9.0-10.0)**: 48 hours to patch
- **High (CVSS 7.0-8.9)**: 7 days to patch
- **Medium (CVSS 4.0-6.9)**: 30 days to patch
- **Low (CVSS 0.1-3.9)**: 90 days or next release

### Metrics

- Mean Time to Detect (MTTD)
- Mean Time to Remediate (MTTR)
- Vulnerability density (vulns per KLOC)
- SLA compliance rate
- Open vulnerability aging

---

## 5. Security Policy Enforcement

### Description

Automated and manual enforcement of organizational security policies across development, deployment, and production environments.

### Policy Categories

- **Access Control Policies**: RBAC, ABAC, least privilege
- **Data Protection Policies**: Encryption standards, data classification
- **Network Security Policies**: Firewall rules, network segmentation
- **Application Security Policies**: Secure coding standards, OWASP guidelines
- **Cloud Security Policies**: CSPM policies, IaC security

### Enforcement Mechanisms

- **CI/CD Gates**: Fail builds on policy violations
- **Infrastructure as Code (IaC) Scanning**: Terraform, CloudFormation validation
- **Runtime Protection**: WAF rules, API gateway policies
- **Access Control**: IAM policy enforcement
- **Secret Management**: No hardcoded credentials, secret rotation

### Policy-as-Code

```yaml
example_policy:
  name: "No Public S3 Buckets"
  severity: "critical"
  resource_type: "aws_s3_bucket"
  condition: "acl != 'public-read' && acl != 'public-readwrite'"
  remediation: "Set S3 bucket ACL to private"
  auto_remediate: false
  notify: ["security-team@example.com"]
```

---

## 6. Incident Response Coordination

### Description

Orchestration of security incident detection, analysis, containment, eradication, and recovery activities.

### Incident Classification

- **SEV1 (Critical)**: Active breach, data exfiltration, complete service outage
- **SEV2 (High)**: Significant vulnerability, partial service degradation
- **SEV3 (Medium)**: Minor security issue with workaround
- **SEV4 (Low)**: Cosmetic or non-urgent security finding

### Response Workflow

1. **Detection**: Automated alerts + manual discovery
2. **Triage**: Severity assessment and classification
3. **Containment**: Immediate actions to limit damage
4. **Investigation**: Root cause analysis, forensics
5. **Eradication**: Remove threat from environment
6. **Recovery**: Restore normal operations
7. **Post-Mortem**: Lessons learned, preventive measures

### Automation Capabilities

- Auto-isolation of compromised instances
- Automated log collection and preservation
- Notification distribution to stakeholders
- Runbook execution for common incident types

### Integration

- SIEM platforms (Splunk, Elastic Security)
- SOAR platforms (Cortex XSOAR, Phantom)
- Ticketing systems (Jira, ServiceNow)
- Communication tools (Slack, PagerDuty)

---

## Capability Maturity Tracking

Each capability is tracked across 5 maturity levels:

1. **Initial**: Ad-hoc, manual, reactive
2. **Managed**: Defined processes, some automation
3. **Defined**: Standardized, documented, organization-wide
4. **Quantitatively Managed**: Metrics-driven, continuous improvement
5. **Optimizing**: Fully automated, predictive, self-improving

**Current Target**: Level 4 (Quantitatively Managed) for all core capabilities.

---

**Document Owner**: Security Architect Agent Team  
**Review Frequency**: Quarterly  
**Next Review Date**: 2026-04-10
