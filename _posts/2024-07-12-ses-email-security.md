---
layout: post
title: "AWS Simple Email Service Security"
summary: "Best practices for Secure Email Sending"
category: Cloud Native
tags: [SES, AWS, Email, Security]
author: [tom_spencer]
comments: true
share: true
---

In the evolving landscape of digital communication, email spoofing poses a significant threat to the integrity of online identities. As a hobby project, and to practice AWS and software design, I have been developing an application called [MovieBooker](https://github.com/tom-spencer-organization/MovieBooker). This application streamlines the process of booking movie tickets and managing movie programs for both moviegoers and staff.

![architecture](/images/2024-07-12-ses-email-security/architecture.png)

## Email Integration with AWS SES

As part of the infrastructure for the MovieBooker application, I implemented [Amazon Simple Email Service (SES)](https://aws.amazon.com/ses/) to send emails when a user pays for a ticket. However, I encountered a challenge where the messages contained a banner with a "Be careful with this message" warning. This marked the beginning of my quest to unravel the secrets of email security.
![Be careful with this message](/images/2024-07-12-ses-email-security/be-careful-with-this-message.png)


## Strengthening Email Security with SPF, DKIM, and DMARC
In order to get rid of the "Be careful with this message" warning. I had to set up Sender Policy Framework (SPF), Domain Keys Identified Mail (DKIM) and Domain Message Authentication Reporting and Conformance (DMARC).

SPF is an email authentication standard that helps protect senders and recipients from spam, spoofing, and phishing. DKIM is a standard email authentication method that adds a digital signature to outgoing messages.
DMARC helps mail administrators prevent hackers and other attackers from spoofing their organization and domain. Spoofing is a type of attack in which the From address of an email message is forged.

Determined to make my application's emails as trustworthy as possible, I delved into SPF, DKIM, and DMARC. These three tools promised an end-to-end authentication mechanism that would transform my emails into beacons of trust.

### What You Will Learn

I aim to share the valuable insights I gained while implementing a secure end-to-end email authentication system. In this article, you will learn how to harness the power of three essential tools:

1. **SPF (Sender Policy Framework)**
2. **DKIM (DomainKeys Identified Mail)**
3. **DMARC (Domain-based Message Authentication, Reporting, and Conformance)**

These lessons were acquired through practical application in fortifying the email communication of my application. Join me as I guide you through the process of implementing these robust security measures.

### Understanding the Threat Landscape

Insecure email communication poses various risks, including phishing attacks that trick recipients into divulging sensitive information, email spoofing for deceptive purposes, and business email compromise (BEC) threats involving unauthorized access to legitimate accounts. Additionally, insecure emails may damage the sender's domain reputation, result in financial losses, and lead to regulatory compliance violations.

To mitigate these risks, it's crucial to implement robust email security measures such as encryption, multi-factor authentication, and the adoption of authentication protocols like SPF, DKIM, and DMARC. Educating users on recognizing and avoiding phishing attempts further enhances overall email security.

## Overview of SPF, DKIM, and DMARC

### SPF - Sender Policy Framework:

- SPF acts as a set of rules and regulations for email servers, authorizing them to send emails on behalf of a specific domain.
- It enables the receiver to determine whether an incoming email is genuinely sent from an authorized server associated with the claimed domain.

### DKIM - DomainKeys Identified Mail:

- DKIM adds a digital signature to outgoing emails, creating a unique identifier that can be verified by the recipient.
- The recipient checks the signature against the public key in the DNS records, ensuring the email is unaltered and genuinely originated from the claimed sender's domain.

### DMARC - Domain-based Message Authentication, Reporting, and Conformance:

- DMARC acts as a protocol that instructs the email receiver on how to handle authenticated emails.
- It provides options such as acceptance, marking as spam, quarantine, or rejection based on SPF and DKIM verification results.

## Benefits of SPF, DKIM, and DMARC:

- **Mitigates the risk of email spoofing and phishing attacks:**
  Ensures only authenticated emails are accepted, reducing the likelihood of malicious activities.

- **Enhances the reputation of your domain:**
  Implementing industry-standard email authentication practices contributes to a positive domain reputation.

- **Provides a clear framework for email handling:**
  Reduces the chances of legitimate emails being marked as spam, improving communication reliability.

- **Aids in achieving and maintaining regulatory compliance:**
  Particularly beneficial in industries with stringent data protection regulations, helping organizations avoid legal consequences and financial penalties.

- **DMARC protects the reputation of the sender's domain:**
  Provides visibility into email authentication results, preventing unauthorized use of the domain in phishing attempts and strengthening overall brand trust.

- **Contributes to the mitigation of data leakage:**
  Ensures that sensitive information transmitted via email is secure and has not been tampered with during transit.

## Establishing a Secure Communication Channel

By implementing SPF, DKIM, and DMARC, we establish a formidable defense against unauthorized email activities, offering a secure and reliable communication channel that fosters trust and confidence among users.

### What is AWS SES?

Amazon Simple Email Service (AWS SES) is a cloud-based email sending service designed to simplify the process of sending emails from applications and websites. Its role extends beyond just delivering emails; AWS SES serves as a comprehensive solution for ensuring secure and reliable email communication.

#### Key Features:

- **Comprehensive Email Solution:**
  AWS SES goes beyond basic email delivery, providing a robust solution for secure communication.

- **Easy Integration with AWS Services:**
  Designed for easy integration with other AWS services, making it straightforward to implement and manage SPF, DKIM, and DMARC alongside complementary AWS solutions.

- **Seamless Integration with Authentication Protocols:**
  AWS SES seamlessly integrates with SPF, DKIM, and DMARC authentication protocols, providing a strong framework to verify sender identity and prevent email spoofing or phishing attempts.

- **Configurable Email Sending Settings:**
  Allows users to configure and customize email sending settings, enabling the implementation of specific security measures tailored to the organization's needs.

With AWS SES, you can ensure that your email communication is not only efficient but also adheres to industry-leading security practices.

## Implementing DKIM with AWS SES

To enhance the security of your email communication, you can implement DKIM (DomainKeys Identified Mail) with Amazon Simple Email Service (AWS SES). Use this link to set up DKIM:
[Setting up Easy DKIM](https://docs.aws.amazon.com/ses/latest/dg/send-email-authentication-dkim-easy.html)


**Set Up Public Key in DNS:**
   Once DKIM signatures are enabled, you need to set up the public key in your DNS.
- Retrieve the public key from the AWS SES console.
- Add a TXT record to your DNS with the DKIM public key.

Example DNS Record:
```bash
Name: _domainkey.yourdomain.com
Type: TXT
Value: "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA..."
```

![DNS record](/images/2024-07-12-ses-email-security/dns-record.png)

![Custom email](/images/2024-07-12-ses-email-security/custom-email.png)

![Record sets](/images/2024-07-12-ses-email-security/record-sets.png)

These steps will guide you through the process of setting up DKIM for your AWS SES configuration, adding an extra layer of authenticity to your outgoing emails.

## Setting up SPF

Before we configure SPF, it's essential to understand the key components of an SPF (Sender Policy Framework) record. SPF is a crucial authentication mechanism that helps prevent email spoofing and phishing attacks. 
Below is a detailed breakdown of the components in an SPF record.

### Version (v):
The SPF version is specified using the "v" tag, followed by the version number. For example, "v=spf1" indicates SPF version 1.

### Mechanisms:
Mechanisms are the core components of an SPF record that define the rules for email server authorization. Common mechanisms include:
- **a:** Allows the domain's A record (IPv4 address) to send mail.
- **mx:** Allows the domain's MX record (mail exchange) to send mail.
- **include:domain.com:** Permits the specified domain to send mail on behalf of the current domain.
- **ip4:192.168.0.1:** Authorizes the specific IPv4 address to send mail.
- **all:** Specifies the default action for servers not covered by previous mechanisms. It can be set to "allow," "deny," or "neutral."

### Directives:
Directives modify or refine the behavior of the mechanisms. Some common directives include:
- **redirect:** Redirects the SPF check to another domain's SPF record.
- **exp:** Explanations that provide additional information in case of SPF failures.
- **exists:** Checks if a specified domain has an A record, allowing for conditional SPF processing.

### Qualifiers:
Qualifiers define the result of a mechanism or directive. There are four possible qualifiers:
- **+ (Pass):** The server is authorized, and the SPF check passes.
- **- (Fail):** The server is not authorized, and the SPF check fails.
- **~ (SoftFail):** The server is not authorized, but the SPF check may still pass (often used for testing or gradual SPF deployment).
- **? (Neutral):** No explicit authorization or denial; the SPF check is inconclusive.

Now, armed with an understanding of these components, you can proceed to configure SPF for your domain, strengthening email authentication and security.

## Example SPF Record

Below is an example SPF (Sender Policy Framework) record that demonstrates the use of different mechanisms and qualifiers:

```
v=spf1 include:_spf.example.com ip4:192.168.0.1 -all
Name: yourdomain.com
Type: TXT
Value: "v=spf1 include:_spf.example.com ip4:192.168.0.1 -all"
```
Create an SPF format
``
"v={spf version}{mechanisms}{directive}{qualifier}all"
``

Follow this link for more information on DNS settings: [DNS settings](https://improvmx.com/guides/configure-your-dns/). I added this TXT entry in Route 53 for SPF support:

![Simple type routing](/images/2024-07-12-ses-email-security/simple-type-routing.png)


## Configuring DMARC Policies

Now, let's walk through the steps to configure DMARC (Domain-based Message Authentication, Reporting, and Conformance) policies for your domain in Amazon Web Services (AWS) using Route 53:

1. **Log in to Amazon Web Services:**
   Go to [https://aws.amazon.com/](https://aws.amazon.com/) and log in to your AWS account.

2. **Navigate to Route 53:**
- Under "Services," find and click on "Route 53" under "Network & Content Delivery."

3. **Access Hosted Zones:**
- In the "DNS Management" section, select "Hosted Zones."

4. **Select Your Domain:**
- From the list of hosted zones, find and click on the domain you want to configure DMARC for.

5. **Create a Record Set:**
- Click on the "Create Record Set" button.

6. **Configure DMARC Record:**
- In the "Name" field, type "_dmarc".
- Under "Type," select "TXT" from the drop-down menu.

Example DMARC Record:
```
Name: _dmarc.yourdomain.com
Type: TXT
Value: "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com; ruf=mailto:dmarc@example.com"
```

Generate a value for the DMARC record set on this site [powerdmarc](https://powerdmarc.com/dmarc-record-generator/)

![Power DMARC 1](/images/2024-07-12-ses-email-security/power-dmarc-1.png)

![Power DMARC 2](/images/2024-07-12-ses-email-security/power-dmarc-2.png)

Add the DMARC record to the DNS record in Route 53:

![DNS Record DMARC](/images/2024-07-12-ses-email-security/dns-record-dmarc.png)


## Conclusion

The implementation of Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM), and Domain-based Message Authentication, Reporting, and Conformance (DMARC) within the framework of Amazon Simple Email Service (SES) presents a robust and multifaceted approach to fortifying email security. By embracing these authentication protocols, organizations and individuals can significantly mitigate risks associated with phishing, email spoofing, and unauthorized access.

- **SPF as the Gatekeeper:**
  SPF acts as a gatekeeper, specifying authorized email servers and reducing the likelihood of malicious actors impersonating trusted sources.

- **DKIM for Extra Security:**
  DKIM adds an extra layer of security by providing a unique digital signature, ensuring that the integrity of the email remains intact during transmission.

- **DMARC as the Decision-Maker:**
  DMARC serves as the wise decision-maker, guiding email receivers on how to handle authenticated emails based on SPF and DKIM verification results.

- **AWS SES Integration:**
  AWS SES, as a reliable and scalable cloud-based email sending service, seamlessly integrates these authentication mechanisms. Its features, such as scalability, deliverability, and compatibility with industry standards, make it a suitable choice for organizations looking to enhance their email security posture. Real-time analytics and monitoring tools, combined with cost-effectiveness, ease of integration, and a developer-friendly interface, contribute to a comprehensive solution for secure email delivery.

In adopting SPF, DKIM, and DMARC with AWS SES, organizations not only safeguard their digital identities but also bolster user trust by ensuring that emails are genuine, secure, and delivered with integrity. This strategic combination lays the foundation for a secure communication channel, fostering a resilient defense against the evolving landscape of email-based threats. As the digital realm continues to advance, this approach stands as a testament to proactive and effective email security practices.

**The best part is you don’t get the "Be careful with this message" warning anymore 🙂.**