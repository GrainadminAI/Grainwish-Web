# Grainwish AI — Information Security Policy & Governance Charter

**Document Classification:** Internal / Public Security Charter  
**Policy Owner:** Technology and Operations Lead  
**Approver:** Authorized Company Management  
**Approval Status:** Draft — Pending Organizational Review and Approval  
**Effective Review Frequency:** At least every six months and upon significant architectural changes  
**Official Reporting Contact:** [security@grainwish.com](mailto:security@grainwish.com) / [support@grainwish.com](mailto:support@grainwish.com)  

---

## 1. Purpose
Grainwish AI is committed to protecting the confidentiality, integrity, and availability of its website, application, business data, customer information, and technology infrastructure.

These policies establish security requirements for employees, developers, administrators, contractors, and authorized third parties.

---

## 2. Scope
These policies apply to:
- The Grainwish website and application (`www.grainwish.com`).
- Source code hosted on GitHub (`GrainadminAI/Grainwish-Web`).
- Application hosting and deployment through Vercel.
- Databases (including Supabase), APIs, cloud storage, and integrations.
- Grain quality assessment records, pricing information, and transaction data.
- Customer, farmer, mill, trader, and business partner information.
- Employee devices, accounts, credentials, and internal systems.

---

## 3. Access Control and Authentication
- Access must be granted according to the principle of least privilege.
- Each authorized user must have an individual account.
- Multi-factor authentication (MFA) must be enabled for GitHub, Vercel, domain registrar, email, and other critical accounts wherever supported.
- Administrator access must be restricted to authorized personnel.
- Access permissions must be reviewed periodically and removed immediately when no longer required.
- Production access must not be shared through common passwords or public links.

---

## 4. Password and Secret Management
- Strong, unique passwords must be used for all business accounts.
- API keys, database passwords, authentication secrets, and private tokens must never be committed to GitHub.
- Secrets must be stored using approved environment-variable or secret-management facilities (e.g., Vercel Project Secrets, Supabase Vault).
- Production and development credentials should be separated.
- Exposed credentials must be revoked or rotated immediately.
- Sensitive credentials must not be included in application logs, screenshots, or error messages.

---

## 5. Website and Application Security
- All public application traffic must use HTTPS (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`).
- User input must be validated and safely processed.
- Database queries must use parameterized queries or equivalent safe mechanisms (e.g., Supabase PostgREST client with parameter binding).
- Authentication and authorization checks must be applied to protected endpoints.
- Cross-site scripting (XSS), injection, cross-site request forgery (CSRF), and other relevant application risks must be addressed.
- Security headers and appropriate Content Security Policy (CSP) settings should be configured.
- Rate limiting must be applied to sensitive endpoints, including login, verification, and expensive AI operations.
- Detailed technical errors must not be exposed to public users.

---

## 6. Data Protection and Privacy
- Only information necessary for legitimate business purposes should be collected.
- Personal and commercially sensitive information must be accessible only to authorized personnel.
- Data must be encrypted in transit (TLS 1.3/1.2) and protected at rest using appropriate controls (AES-256).
- Production data must not be copied into development or testing environments without authorization and suitable safeguards.
- Data retention and deletion must follow documented business, contractual, and applicable legal requirements (DPDP Act 2023, GDPR).
- Customer information must not be disclosed to unauthorized parties.
- AI services and third-party processors must be reviewed before confidential information is shared with them.

---

## 7. GitHub and Source Code Security
- Repository access must be limited to approved contributors.
- Multi-factor authentication must be enabled for repository administrators.
- Pull requests and code reviews should be required for changes to production code.
- Dependency vulnerabilities must be monitored and addressed according to risk (automated `npm audit`, Dependabot).
- Automated secret scanning and dependency scanning should be enabled where available.
- Branch protection should be configured for the production branch (`main`).
- Unreviewed or unauthorized changes must not be deployed to production.

---

## 8. Vercel and Cloud Infrastructure Security
- Production deployments must use authorized projects and accounts.
- Environment variables must be configured securely and separated by environment (Production vs Preview vs Development).
- Production deployment permissions must be restricted.
- Preview deployments must not expose production secrets or confidential customer information.
- Domain registrar and DNS access must be protected with MFA and restricted permissions.
- DNS records must be changed only by authorized personnel.
- Deployment logs and infrastructure settings must be reviewed for suspicious activity.
- Backups and recovery procedures must be maintained for critical data and services.

---

## 9. API and Third-Party Integrations
- APIs must authenticate and authorize requests appropriately.
- API keys must have the minimum permissions required.
- Third-party providers must be assessed for security, privacy, and business suitability.
- Unnecessary API access must be disabled.
- External service failures must be handled gracefully without exposing confidential information.
- Webhooks must be authenticated or cryptographically verified where supported (HMAC signatures).

---

## 10. Security Monitoring and Incident Response
All suspected security incidents must be reported promptly to the designated security or technology lead at [security@grainwish.com](mailto:security@grainwish.com).

### Incident Response Lifecycle:
1. **Identify**: Detect and document the incident with timestamps, affected assets, and vector.
2. **Contain**: Restrict affected accounts, services, or systems immediately.
3. **Investigate**: Determine the root cause, scope of compromise, and potential impact.
4. **Recover**: Restore secure operations, verify system integrity, and rotate compromised credentials.
5. **Notify**: Inform affected parties and relevant authorities (including CERT-In when applicable) as required by law or contract.
6. **Review**: Document lessons learned, post-mortem analysis, and implement preventive measures.

Security incidents must be recorded in an internal register with their timeline, impact, actions taken, and resolution.

---

## 11. Backup and Business Continuity
- Critical business data must be backed up according to an approved schedule.
- Backup access must be restricted and backups protected from unauthorized changes.
- Restoration procedures must be tested periodically.
- Recovery priorities and acceptable downtime must be documented (RTO / RPO metrics).
- Critical services must have a documented recovery plan.

---

## 12. Employee and Developer Responsibilities
All employees and contractors must:
- Protect company devices and credentials with full-disk encryption and strong passphrases.
- Avoid installing unauthorized or untrusted software.
- Report suspicious emails, phishing attempts, and unexpected access requests.
- Follow secure coding and data-handling practices (OWASP Top 10 guidelines).
- Complete security awareness training where required.
- Return company assets and surrender access immediately when their engagement ends.

---

## 13. Vulnerability Management
- Security updates must be reviewed and applied according to severity and exposure.
- Critical vulnerabilities affecting production systems must be prioritized for urgent remediation (within 24–48 hours).
- Dependency updates must be tested before production deployment.
- Security testing must be conducted before major releases and when significant changes warrant it.
- Confirmed vulnerabilities must be tracked until remediation or formally approved risk acceptance.

---

## 14. Compliance and Policy Enforcement
- All users within the scope of this policy must comply with its requirements.
- Violations may result in access suspension, corrective action, contractual remedies, or other measures permitted by applicable law.
- The organization must review applicable Indian data protection (Digital Personal Data Protection Act 2023), cybersecurity (CERT-In directions), contractual, and sector-specific requirements and maintain any necessary supporting procedures.

---

## 15. Policy Review and Approval
This policy must be reviewed at least every six months and whenever significant changes occur in the application's architecture, business operations, or applicable legal requirements.

- **Policy Owner**: Technology and Operations Lead
- **Approver**: Authorized Company Management
- **Approval Status**: Draft — pending organizational review and approval
- **Document Classification**: Internal
