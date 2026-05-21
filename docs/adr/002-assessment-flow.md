# ADR 002: Assessment Flow Architecture

## Status
Proposed

## Context
The assessment feature is a core conversion mechanism that captures qualified leads through a self-service diagnostic quiz. The flow consists of multiple user states and backend processing steps that must be smooth, reliable, and data-driven.

## Decision
We implemented a multi-phase assessment flow with the following architecture:

### User Flow States
1. **Landing**: Initial page showing assessment intro and "Start" button
2. **Quiz**: Interactive 9-question diagnostic with progress tracking
3. **Email Capture**: Form collecting prospect email before results
4. **Redirecting**: Loading state while processing results
5. **Results Page**: Dynamic page showing personalized archetype, scores, and diagnosis

### Backend Processing
- **Assessment Submission API** (`/api/assessment/submit`): Validates inputs, stores lead in Firestore, sends two emails (prospect and owner)
- **Lead Storage**: Firestore collection `assessment_leads` with metadata (email, archetype, scores, source, timestamp)
- **Email Automation**: Resend API for transactional emails with personalized content

### Client-Side State Management
- **React Hooks**: `useState` for current phase, answers, scores, and archetype
- **Analytics Tracking**: OpenTelemetry events at each stage (start, question answered, conversion)
- **URL Parameters**: Query params `c`, `r`, `u` for scores passed to results page

### Architecture Patterns
- **State Machine**: Phase-based rendering with clear transitions
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Analytics-Driven**: Every user action tracked for optimization
- **Server-Side Generation**: Results page pre-rendered with SEO-friendly URLs

## Rationale

### Why Multi-Phase Flow?
- **Reduced Friction**: Clear separation of concerns makes the quiz feel shorter and more manageable
- **Email Capture**: Captures leads before showing results, increasing conversion rate
- **Analytics**: Each phase provides distinct tracking data for optimization

### Why Firestore for Lead Storage?
- **Real-time**: Instant access to lead data for monitoring
- **Flexible Schema**: Easy to add new fields as requirements evolve
- **Security**: Native Firestore security rules for data protection
- **Cost**: Generous free tier for small to medium traffic

### Why URL Query Params for Scores?
- **SEO**: Results page URL contains scores, improving discoverability
- **Shareability**: Users can share their results (e.g., social media)
- **Direct Access**: Users can navigate to results page directly
- **No Session**: Scores don't depend on server session state

### Why OpenTelemetry for Analytics?
- **Comprehensive**: Standardized event tracking across the app
- **Performance**: Client-side tracking doesn't block user experience
- **Integration**: Works with Firebase Analytics for comprehensive view

## Consequences

### Positive
- **High Conversion Rate**: Email capture before results increases leads
- **Good UX**: Progressive disclosure keeps quiz length manageable
- **Data-Driven**: Analytics at each stage enables continuous optimization
- **SEO Friendly**: Server-side rendering improves search visibility
- **Reliable**: Clear error handling prevents user frustration

### Negative
- **Complex State**: Multi-phase flow requires careful state management
- **Email Dependency**: Assessment fails if emails aren't delivered
- **Firestore Costs**: Storage and reads increase with scale
- **Latency**: Network calls for email and database can slow down flow

### Mitigations
- **Graceful Degradation**: Continue flow if emails fail (log error, show email later)
- **Firestore Indexing**: Optimize queries for performance
- **Async Email**: Queue emails to prevent blocking
- **Cache Results**: Cache results in Redis or similar if needed

### Alternatives Considered

#### Alternative 1: Single-Page Results
- **Approach**: Show results immediately after quiz, email sent asynchronously
- **Pros**: Faster user experience, fewer page loads
- **Cons**: Lower conversion rate (no email capture), less data capture
- **Rejected**: Conversion rate is critical for this use case

#### Alternative 2: Server-Side Email Verification
- **Approach**: Validate email via SMTP before showing results
- **Pros**: Higher quality leads
- **Cons**: Slower, lower conversion rate, more complexity
- **Rejected**: Conversion rate outweighs email quality benefits

#### Alternative 3: No Email Capture
- **Approach**: Show results immediately, email sent after
- **Pros**: Fastest user experience
- **Cons**: Lower conversion rate (no lead capture)
- **Rejected**: Email capture is essential for follow-up

## References
- [Firebase Firestore Security](https://firebase.google.com/docs/firestore/security)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/api-routes)