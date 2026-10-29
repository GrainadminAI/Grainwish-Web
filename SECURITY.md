# Grainwish AI — Information Security Policy & Governance Charter

**Document Classification:** Internal  
**Policy Owner:** Technology and Operations Lead  
**Approver:** Authorized Company Management  
**Approval Status:** Draft — pending organizational review and approval  
**Effective Review Frequency:** At least every six months and whenever significant changes occur  
**Official Reporting Contact:** [security@grainwish.com](mailto:security@grainwish.com) / [support@grainwish.com](mailto:support@grainwish.com)  

---

## 1. Purpose
Grainwish AI is committed to protecting the confidentiality, integrity, and availability of its website, application, business data, customer information, and technology infrastructure.
These policies establish security requirements for employees, developers, administrators, contractors, and authorized third parties.

---

## 2. Scope
These policies apply to:
- The Grainwish website and application.
- Source code hosted on GitHub.
- Application hosting and deployment through Vercel.
- Databases, APIs, cloud storage, and integrations.
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
- Secrets must be stored using approved environment-variable or secret-management facilities.
- Production and development credentials should be separated.
- Exposed credentials must be revoked or rotated immediately.
- Sensitive credentials must not be included in application logs, screenshots, or error messages.

---

## 5. Website and Application Security
- All public application traffic must use HTTPS.
- User input must be validated and safely processed.
- Database queries must use parameterized queries or equivalent safe mechanisms.
- Authentication and authorization checks must be applied to protected endpoints.
- Cross-site scripting (XSS), injection, cross-site request forgery (CSRF), and other relevant application risks must be addressed.
- Security headers and appropriate Content Security Policy (CSP) settings should be configured.
- Rate limiting must be applied to sensitive endpoints, including login, verification, and expensive AI operations.
- Detailed technical errors must not be exposed to public users.

---

## 6. Data Protection and Privacy
- Only information necessary for legitimate business purposes should be collected.
- Personal and commercially sensitive information must be accessible only to authorized personnel.
- Data must be encrypted in transit and protected at rest using appropriate controls.
- Production data must not be copied into development or testing environments without authorization and suitable safeguards.
- Location and GPS telemetry must be collected only upon affirmative user opt-in, processed ephemerally on-device or via encrypted reverse-geocoding, never continuously tracked in the background, and never sold to third-party data brokers, adhering strictly to the DPDP Act 2023 and GDPR.
- Data retention and deletion must follow documented business, contractual, and applicable legal requirements.
- Customer information must not be disclosed to unauthorized parties.
- AI services and third-party processors must be reviewed before confidential information is shared with them.

---

## 7. GitHub and Source Code Security
- Repository access must be limited to approved contributors.
- Multi-factor authentication must be enabled for repository administrators.
- Pull requests and code reviews should be required for changes to production code.
- Dependency vulnerabilities must be monitored and addressed according to risk.
- Automated secret scanning and dependency scanning should be enabled where available.
- Branch protection should be configured for the production branch.
- Unreviewed or unauthorized changes must not be deployed to production.

---

## 8. Vercel and Cloud Infrastructure Security
- Production deployments must use authorized projects and accounts.
- Environment variables must be configured securely and separated by environment.
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
- External service failures must be handled without exposing confidential information.
- Webhooks must be authenticated or cryptographically verified where supported.

---

## 10. Security Monitoring and Incident Response
All suspected security incidents must be reported promptly to the designated security or technology lead.
The incident response process consists of:

- **Identify**: Detect and document the incident.
- **Contain**: Restrict affected accounts, services, or systems.
- **Investigate**: Determine the cause and potential impact.
- **Recover**: Restore secure operations and rotate compromised credentials.
- **Notify**: Inform affected parties and relevant authorities when required by applicable law or contract.
- **Review**: Document lessons learned and implement preventive measures.

Security incidents must be recorded with their timeline, impact, actions taken, and resolution.

---

## 11. Backup and Business Continuity
- Critical business data must be backed up according to an approved schedule.
- Backup access must be restricted and backups protected from unauthorized changes.
- Restoration procedures must be tested periodically.
- Recovery priorities and acceptable downtime must be documented.
- Critical services must have a documented recovery plan.

---

## 12. Employee and Developer Responsibilities
All employees and contractors must:
- Protect company devices and credentials.
- Avoid installing unauthorized or untrusted software.
- Report suspicious emails, phishing attempts, and unexpected access requests.
- Follow secure coding and data-handling practices.
- Complete security awareness training where required.
- Return company assets and surrender access when their engagement ends.

---

## 13. Vulnerability Management
- Security updates must be reviewed and applied according to severity and exposure.
- Critical vulnerabilities affecting production systems must be prioritized for urgent remediation.
- Dependency updates must be tested before production deployment.
- Security testing must be conducted before major releases and when significant changes warrant it.
- Confirmed vulnerabilities must be tracked until remediation or formally approved risk acceptance.

---

## 14. Compliance and Policy Enforcement
All users within the scope of this policy must comply with its requirements.
Violations may result in access suspension, corrective action, contractual remedies, or other measures permitted by applicable law.
The organization must review applicable Indian data protection, cybersecurity, contractual, and sector-specific requirements and maintain any necessary supporting procedures.

---

## 15. Policy Review and Approval
This policy must be reviewed at least every six months and whenever significant changes occur in the application's architecture, business operations, or applicable legal requirements.

- **Policy Owner**: Technology and Operations Lead
- **Approver**: Authorized Company Management
- **Approval Status**: Draft — pending organizational review and approval
- **Document Classification**: Internal
