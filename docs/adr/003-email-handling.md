# ADR 003: Email Handling Strategy

## Status
Proposed

## Context
The assessment feature sends two types of automated emails:
1. **Prospect Result Email**: Sent to users with their assessment results and personalized CTA
2. **Alex Notification Email**: Sent to the site owner when a new lead is captured

These emails must be reliable, branded, and personalized while maintaining deliverability and user experience.

## Decision
We implemented a centralized email handling strategy with the following architecture:

### Email Templates
All email HTML templates are centralized in `src/lib/assessment/email-templates.ts` with two exported functions:
- `buildProspectResultEmail(data: ResultEmailData): string` - Main email to prospects
- `buildAlexNotificationEmail(data: ResultEmailData): string` - Lead notification to Alex

### Email Utilities
Shared utilities in `src/lib/email-utils.ts`:
- `buildEmailWrapper(options)` - Standard email wrapper with header, body, footer
- `EMAIL_BRAND` - Consistent branding configuration (colors, URLs, branding text)
- `escapeHtml(text)` - Security: prevents XSS in email content

### Email Sending Flow
1. **API Endpoint**: `/api/assessment/submit` handles POST requests
2. **Validation**: Email format and archetype validation
3. **Lead Storage**: Firestore write (optional, non-blocking)
4. **Email Sending**: Resend API calls for both emails (parallel execution)
5. **Response**: Success response with email ID

### Email Content Structure

#### Prospect Result Email
- **Header**: "Your AI Readiness Results" with branding
- **Body**:
  - Archetype profile (name, headline)
  - Three scores with visual bars (Clarity, Readiness, Urgency)
  - Personalized diagnosis paragraph
  - Book a Free Strategy Call CTA
- **Footer**: Contact info and unsubscribe link

#### Alex Notification Email
- **Header**: "New Assessment Lead" with branding
- **Body**:
  - Prospect email
  - Archetype name and slug
  - Three scores with visual bars
  - Recommended CTA
  - Pre-call context (first diagnosis point)
- **Footer**: Sent from thearmchairfuturist.com

### Configuration
- **Alex Email**: `process.env.ALEX_EMAIL` (default: `armchairfuturist@gmail.com`)
- **From Email**: `process.env.RESEND_FROM_EMAIL` (default: `Alex Myers <alex@thearmchairfuturist.com>`)
- **Calendar URL**: Configured in `EMAIL_BRAND.calendarUrl`
- **Branding Colors**: Consistent colors for all emails (blue, green, amber)

## Rationale

### Why Centralized Email Templates?
- **Maintainability**: Single source of truth for email content
- **Consistency**: Uniform branding across all emails
- **Testing**: Easier to test and iterate on email logic
- **Security**: Centralized XSS protection via `escapeHtml`

### Why Resend API?
- **Transaction Emails**: Optimized for one-off emails (assessments)
- **Easy Integration**: Simple REST API with TypeScript SDK
- **Deliverability**: Built-in reputation management
- **Cost**: Generous free tier (3,000 emails/month)

### Why HTML Email Format?
- **Rich Content**: Support for tables, images, links, and styling
- **Mobile Friendly**: Responsive design works on all devices
- **Branding**: Full control over visual presentation
- **Attachments**: Can include PDF reports if needed later

### Why Branded Wrapper?
- **Professional**: Consistent look and feel across all emails
- **Trust**: Branded emails look more legitimate
- **Unsubscribe**: Built-in unsubscribe support for compliance
- **Tracking**: Can add open and click tracking

## Consequences

### Positive
- **Reliability**: Centralized error handling prevents duplicate emails
- **Personalization**: Dynamic content based on user data
- **Branding**: Consistent professional appearance
- **Security**: XSS protection prevents email spoofing
- **Maintainability**: Easy to update templates without touching API code

### Negative
- **Email Dependency**: Flow fails if Resend is unavailable
- **Testability**: HTML email templates are harder to test
- **Deliverability**: Must maintain good sending reputation
- **Cost**: Email costs scale with traffic

### Mitigations
- **Graceful Degradation**: Log errors, show user-friendly message, allow retry later
- **Email Testing**: Use Resend's sandbox/testing mode
- **Sending Reputation**: Monitor bounce rates and spam complaints
- **Queueing**: Implement email queue for high-volume scenarios

### Alternatives Considered

#### Alternative 1: SendGrid
- **Pros**: Mature email service, good deliverability
- **Cons**: More complex API, higher costs for transactional emails
- **Rejected**: Resend has simpler API and better free tier

#### Alternative 2: Custom SMTP Server
- **Pros**: Full control, no dependency on third-party
- **Cons**: High operational overhead, maintenance burden
- **Rejected**: Not suitable for small team, higher risk of deliverability issues

#### Alternative 3: No Email (Direct Results Display)
- **Pros**: Simplified architecture, faster user experience
- **Cons**: Lower conversion rate, no lead capture
- **Rejected**: Email capture is essential for follow-up

#### Alternative 4: Backend Email Templates
- **Approach**: Email templates in a database with template engine
- **Pros**: Easy to update without deployments
- **Cons**: More complexity, lower performance
- **Rejected**: Overkill for this use case

## References
- [Resend API Documentation](https://resend.com/docs/api-reference)
- [HTML Email Best Practices](https://www.smtp2go.com/resources/html-email-guide/)
- [RFC 5322 (Email Standards)](https://tools.ietf.org/html/rfc5322)