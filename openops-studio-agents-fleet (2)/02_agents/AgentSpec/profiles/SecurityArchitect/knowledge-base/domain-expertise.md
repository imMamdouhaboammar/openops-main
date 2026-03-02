# Security Architect - Domain Expertise & Best Practices

**Version**: 1.0.0  
**Last Updated**: 2026-01-10

---

## Overview

This document consolidates domain-specific knowledge, industry best practices, and authoritative resources that inform the Security Architect agent's decision-making and recommendations.

---

## 1. Security Frameworks Deep Dive

### OWASP (Open Worldwide Application Security Project)

#### OWASP Top 10 (2025)

1. **Broken Access Control** - Remains #1 risk
   - Vertical privilege escalation
   - Horizontal privilege escalation
   - IDOR (Insecure Direct Object References)
   - **Mitigation**: Implement RBAC, deny by default, validate ownership

2. **Cryptographic Failures** (formerly Sensitive Data Exposure)
   - Weak encryption algorithms (MD5, SHA1)
   - Hardcoded keys
   - Unencrypted sensitive data
   - **Mitigation**: TLS 1.3+, AES-256, proper key management

3. **Injection**
   - SQL Injection (still prevalent)
   - NoSQL Injection
   - LDAP Injection
   - Command Injection
   - **Mitigation**: Parameterized queries, input validation, least privilege DB accounts

4. **Insecure Design** - NEW category emphasizing security by design
   - Missing threat modeling
   - Insecure default configurations
   - **Mitigation**: Threat modeling, secure design patterns, secure defaults

5. **Security Misconfiguration**
   - Default credentials
   - Unnecessary features enabled
   - Missing security headers
   - **Mitigation**: Hardening guides, automated compliance scanning

6. **Vulnerable and Outdated Components**
   - Unpatched libraries
   - End-of-life software
   - **Mitigation**: SCA scanning, dependency updates, SBOM

7. **Identification and Authentication Failures**
   - Weak password policies
   - No MFA
   - Session fixation
   - **Mitigation**: MFA, strong password policies, secure session management

8. **Software and Data Integrity Failures** - NEW
   - Unsigned code/artifacts
   - CI/CD pipeline compromise
   - **Mitigation**: Code signing, SLSA framework, supply chain security

9. **Security Logging and Monitoring Failures**
   - Insufficient logging
   - Logs not monitored
   - **Mitigation**: SIEM, real-time alerting, comprehensive audit logs

10. **Server-Side Request Forgery (SSRF)**
    - Access to internal resources
    - Cloud metadata service exploitation
    - **Mitigation**: Whitelist URLs, network segmentation, input validation

#### OWASP API Security Top 10 (2025)

1. Broken Object Level Authorization (BOLA)
2. Broken Authentication
3. Broken Object Property Level Authorization
4. Unrestricted Resource Consumption
5. Broken Function Level Authorization
6. Unrestricted Access to Sensitive Business Flows
7. Server-Side Request Forgery (SSRF)
8. Security Misconfiguration
9. Improper Inventory Management
10. Unsafe Consumption of APIs

#### OWASP Secure by Design Framework (Draft v0.5.0)

**Principles**:

- Security requirements defined early
- Threat modeling in design phase
- Secure defaults everywhere
- Defense in depth
- Least privilege
- Zero trust boundaries

**Deliverables**:

- Design-phase security checklist
- Microservices security patterns
- Secure API/messaging guidelines

---

### NIST Cybersecurity Framework 2.0

#### New: GOVERN Function

**Purpose**: Establish and monitor cybersecurity governance and risk management strategy

**Key Categories**:

- **GV.OC**: Organizational Context - Understand business mission and stakeholders
- **GV.RM**: Risk Management Strategy - Define risk appetite and tolerance
- **GV.RR**: Roles and Responsibilities - Clear cybersecurity accountability
- **GV.PO**: Policy - Establish and communicate policies
- **GV.OV**: Oversight - Board and executive oversight
- **GV.SC**: Supply Chain Risk Management - Third-party risk management

#### Core Functions (Updated)

1. **GOVERN** (NEW) - Strategy and oversight
2. **IDENTIFY** - Asset management, risk assessment
3. **PROTECT** - Access control, data security, protective technology
4. **DETECT** - Continuous monitoring, anomaly detection
5. **RESPOND** - Response planning, analysis, mitigation
6. **RECOVER** - Recovery planning, improvements, communications

#### NIST SP 800-53 Rev. 5 - Key Control Families

- **AC**: Access Control
- **AU**: Audit and Accountability
- **CA**: Assessment, Authorization, and Monitoring
- **CM**: Configuration Management
- **CP**: Contingency Planning
- **IA**: Identification and Authentication
- **IR**: Incident Response
- **SC**: System and Communications Protection
- **SI**: System and Information Integrity

---

### ISO/IEC 27001:2022

#### Annex A Control 8.27: Secure System Architecture

**Purpose**: Ensure information systems designed, implemented, and operated securely from ground up

**Principles**:

- Security by design and default
- Defense in depth
- Zero trust
- Least privilege
- Modular and layered architecture
- System hardening
- Continuous improvement

#### Key Changes in 2022 Update

- **New Controls**:
  - Threat intelligence (5.7)
  - Cloud services information security (5.23)
  - Configuration management (8.9)
  - Data masking (8.11)
  - Data leakage prevention (8.12)
  - Monitoring activities (8.16)
  - Web filtering (8.23)
  - Secure coding (8.28)

---

## 2. Security Design Patterns

### Secure Authentication Patterns

#### Pattern: OAuth 2.1 with PKCE

```yaml
pattern_name: "OAuth 2.1 Authorization Code Flow with PKCE"
use_case: "Secure authorization for web and mobile apps"
components:
  - Authorization Server
  - Resource Server
  - Client Application
flow:
  1. Client generates code verifier and challenge
  2. Client redirects user to authorization endpoint with challenge
  3. User authenticates and authorizes
  4. Authorization server returns authorization code
  5. Client exchanges code + verifier for tokens
  6. Client uses access token to access resources
security_benefits:
  - Prevents authorization code interception
  - No client secret needed for public clients
  - PKCE adds cryptographic binding
```

#### Pattern: JWT with Short Expiry + Refresh Tokens

```yaml
pattern_name: "Short-Lived JWT with Secure Refresh"
best_practices:
  - Access token expiry: 15 minutes
  - Refresh token expiry: 7 days
  - Refresh token rotation on use
  - Store refresh tokens securely (HttpOnly cookie, encrypted DB)
  - No sensitive data in JWT payload
  - Always validate signature (RS256, ES256)
```

### Secure Data Protection Patterns

#### Pattern: Encryption at Rest with Key Rotation

```python
# Example: AWS KMS with automatic rotation
encryption_config = {
    "algorithm": "AES-256-GCM",
    "key_management": {
        "provider": "AWS KMS",
        "key_id": "arn:aws:kms:...",
        "rotation": "automatic_90_days"
    },
    "envelope_encryption": True,  # Encrypt data key with master key
    "audit_logging": True
}
```

#### Pattern: Field-Level Encryption

```yaml
use_case: "Protect PII in database even if DB is compromised"
implementation:
  - Sensitive fields encrypted with unique data encryption keys (DEKs)
  - DEKs encrypted with master key (envelope encryption)
  - Decryption only at application layer with proper authorization
  - Searchable encryption for fields requiring queries
example_fields:
  - SSN/National ID
  - Credit card numbers
  - Medical records
```

---

## 3. Threat Intelligence Sources

### Vulnerability Databases

- **NVD** (National Vulnerability Database): <https://nvd.nist.gov/>
- **CVE**: <https://cve.mitre.org/>
- **GitHub Security Advisories**: <https://github.com/advisories>
- **Snyk Vulnerability Database**: <https://snyk.io/vuln>

### Threat Intelligence Feeds

- **MITRE ATT&CK**: <https://attack.mitre.org/>
- **CISA Known Exploited Vulnerabilities**: <https://www.cisa.gov/known-exploited-vulnerabilities-catalog>
- **Alienvault OTX**: <https://otx.alienvault.com/>
- **OWASP Dependency-Check Feeds**: Aggregated CVE feeds

### Security Research

- **Google Project Zero**: <https://googleprojectzero.blogspot.com/>
- **Talos Intelligence**: <https://blog.talosintelligence.com/>
- **Krebs on Security**: <https://krebsonsecurity.com/>
- **Schneier on Security**: <https://www.schneier.com/>

---

## 4. Secure Coding Guidelines

### Language-Specific Security

#### Python

```python
# ❌ BAD: SQL Injection vulnerability
def get_user_unsafe(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    return db.execute(query)

# ✅ GOOD: Parameterized query
def get_user_safe(user_id):
    query = "SELECT * FROM users WHERE id = ?"
    return db.execute(query, (user_id,))

# ✅ GOOD: Input validation
from pydantic import BaseModel, validator

class UserInput(BaseModel):
    user_id: int
    
    @validator('user_id')
    def validate_user_id(cls, v):
        if v < 1:
            raise ValueError('Invalid user ID')
        return v
```

#### JavaScript/TypeScript

```typescript
// ❌ BAD: XSS vulnerability
function displayUserContent(content: string) {
  document.getElementById('output').innerHTML = content;
}

// ✅ GOOD: Safe content rendering
function displayUserContentSafe(content: string) {
  const element = document.getElementById('output');
  element.textContent = content; // Auto-escapes
}

// ✅ GOOD: Content Security Policy
const cspHeader = 
  "default-src 'self'; " +
  "script-src 'self'; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data: https:;";
```

---

## 5. Security Testing Methodologies

### Penetration Testing Standards

- **PTES** (Penetration Testing Execution Standard)
- **OWASP Testing Guide v4.2**
- **OSSTMM** (Open Source Security Testing Methodology Manual)
- **NIST SP 800-115**: Technical Guide to Information Security Testing

### Test Coverage Matrix

```markdown
| Layer | Testing Method | Frequency | Tools |
|-------|----------------|-----------|-------|
| Code | SAST | Pre-commit | SonarQube, Semgrep |
| Build | SCA | Every build | Snyk, Dependabot |
| Deploy | DAST | Weekly | OWASP ZAP, Burp Suite |
| Infra | Config Scan | Daily | Prowler, ScoutSuite |
| Runtime | RASP | Continuous | Contrast, Hdiv |
| Manual | Pentest | Quarterly | External firm |
```

---

## 6. Incident Response Playbooks

### Security Incident Classification

```yaml
SEV1_CRITICAL:
  definition: "Active breach, data exfiltration, complete service outage"
  response_time: "Immediate (< 15 minutes)"
  escalation: "Automatic to CISO, CTO, CEO"
  communication: "All stakeholders + legal"
  
SEV2_HIGH:
  definition: "Significant vulnerability, partial degradation"
  response_time: "< 1 hour"
  escalation: "Security Lead, Staff Engineer"
  communication: "Internal security team"
```

### Common Incident Playbooks

1. **Ransomware Response**
   - Isolate affected systems immediately
   - Do NOT pay ransom (FBI recommendation)
   - Restore from clean backups
   - Forensic investigation
   - Patch vulnerability that allowed entry

2. **Data Breach Response**
   - Contain breach
   - Assess scope of data compromised
   - Notify affected parties (GDPR: 72 hours)
   - Regulatory notification
   - Post-mortem and remediation

3. **DDoS Attack Response**
   - Activate DDoS mitigation (Cloudflare, AWS Shield)
   - Traffic analysis to identify attack pattern
   - IP blacklisting
   - Scaling infrastructure if necessary

---

## 7. Compliance & Regulatory Knowledge

### GDPR (EU General Data Protection Regulation)

**Key Requirements for Security**:

- **Data Protection by Design**: Security from inception
- **Data Protection by Default**: Minimal data collection
- **Breach Notification**: 72 hours to supervisory authority
- **Data Subject Rights**: Access, rectification, erasure, portability
- **Data Processing Records**: Document all processing activities
- **DPO Requirement**: For large-scale sensitive data processing

### NDMO (Saudi National Data Management Office)

**Key Regulations**:

- **Data Localization**: Critical data must be stored in Saudi Arabia
- **Cross-Border Transfer**: Requires approval for international transfers
- **Data Classification**: 4 levels (Public, Internal, Confidential, Secret)
- **Encryption**: Mandatory for confidential and secret data
- **Access Control**: Role-based, least privilege
- **Audit Trails**: Comprehensive logging required

### PCI-DSS (Payment Card Industry Data Security Standard)

**12 Requirements**:

1. Install and maintain firewall configuration
2. Do not use vendor-supplied defaults
3. Protect stored cardholder data
4. Encrypt transmission of cardholder data
5. Protect against malware
6. Develop secure systems and applications
7. Restrict access by business need-to-know
8. Identify and authenticate access
9. Restrict physical access to cardholder data
10. Track and monitor all access to network resources
11. Regularly test security systems and processes
12. Maintain information security policy

---

## 8. Recommended Reading & Resources

### Books

- **"Threat Modeling: Designing for Security"** by Adam Shostack
- **"Security Engineering"** by Ross Anderson
- **"The Web Application Hacker's Handbook"** by Dafydd Stuttard & Marcus Pinto
- **"Applied Cryptography"** by Bruce Schneier

### Online Courses

- **SANS SEC401**: Security Essentials
- **SANS SEC540**: Cloud Security and DevSecOps Automation
- **Offensive Security OSCP**: Penetration Testing Certification

### Certifications

- **CISSP** (Certified Information Systems Security Professional)
- **CISM** (Certified Information Security Manager)
- **CEH** (Certified Ethical Hacker)
- **OSCP** (Offensive Security Certified Professional)

---

**Document Owner**: Security Architect Agent Team  
**Review Frequency**: Monthly  
**Next Review**: 2026-02-10
