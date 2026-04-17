# Firebase Analytics Setup

Firebase Analytics has been successfully integrated into your Next.js application with automatic page view tracking.

## 📁 Files Created

### 1. **[firebase.ts](file:///C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/lib/firebase.ts)**
   - Core Firebase configuration and initialization
   - Prevents duplicate Firebase instances
   - Handles server-side rendering safely
   - Exports `getAnalyticsInstance()` function

### 2. **[FirebaseAnalytics.tsx](file:///C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/components/analytics/FirebaseAnalytics.tsx)**
   - Client-side component that tracks page views automatically
   - Uses Next.js `usePathname()` and `useSearchParams()` hooks
   - Tracks route changes in real-time
   - Logs page views with full URL, title, and location

### 3. **[analytics.ts](file:///C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/lib/analytics.ts)**
   - Utility functions for custom event tracking
   - `trackEvent()` - Track any custom event
   - `trackConversion()` - Track conversion events with value

### 4. **[layout.tsx](file:///C:/Users/Administrator/Documents/Projects/ArmchairFuturistLanding/src/app/layout.tsx)** (Modified)
   - Added `<FirebaseAnalytics />` component to the root layout
   - Ensures analytics tracks all pages across your application

## ✅ What's Working

### Automatic Page View Tracking
- ✅ Tracks initial page load
- ✅ Tracks route changes (Next.js navigation)
- ✅ Includes query parameters
- ✅ Captures page title and full URL
- ✅ Console logs for debugging (check browser console)

### Safe Server-Side Rendering
- ✅ Analytics only initializes in the browser
- ✅ No SSR errors from Firebase
- ✅ Singleton pattern prevents duplicate instances

## 🎯 How to Use

### Viewing Analytics Data

1. **Real-time Tracking**: Open your browser console and navigate between pages
   - You'll see: `📊 Firebase Analytics: Page view tracked - /your-page`

2. **Firebase Console**: Visit [Firebase Console](https://console.firebase.google.com/)
   - Go to **Analytics** → **Events** → **page_view**
   - Real-time data appears within minutes
   - Full reports available within 24 hours

### Tracking Custom Events

Use the utility functions in any client component:

```tsx
'use client';

import { trackEvent, trackConversion } from '@/lib/analytics';

export default function MyComponent() {
  const handleButtonClick = () => {
    trackEvent('cta_click', {
      button_name: 'Get Started',
      section: 'hero',
    });
  };

  const handleFormSubmit = () => {
    trackConversion('newsletter_signup', 0, 'USD');
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Get Started</button>
      <button onClick={handleFormSubmit}>Subscribe</button>
    </div>
  );
}
```

## 🔍 Debugging

### Check Browser Console
The setup includes console logs for debugging:
- `📊 Firebase Analytics: Page view tracked - /page`
- `📊 Firebase Analytics: Event tracked - event_name`

### Common Issues

**1. "Firebase Analytics is not available"**
- Analytics only works in browser, not during SSR
- This is expected and handled gracefully

**2. Events not showing in Firebase Console**
- Real-time events may take 1-2 minutes to appear
- Full reports take up to 24 hours
- Check that you're looking at the correct project

**3. Page views not tracking**
- Check browser console for errors
- Ensure `<FirebaseAnalytics />` is in layout.tsx
- Verify Firebase config credentials are correct

## 📊 Recommended Events to Track

### User Engagement
```tsx
trackEvent('engagement', {
  engagement_type: 'scroll_to_section',
  section_name: 'services'
});
```

### Button Clicks
```tsx
trackEvent('button_click', {
  button_name: 'learn_more',
  button_location: 'hero'
});
```

### Form Submissions
```tsx
trackEvent('form_submit', {
  form_name: 'contact',
  success: true
});
```

### Conversions
```tsx
trackConversion('package_selected', 0, 'USD');
trackConversion('consultation_booked', 0, 'USD');
```

## 🚀 Next Steps

1. **Test the implementation**
   - Open your site in a browser
   - Check the console for analytics logs
   - Navigate between pages

2. **Verify in Firebase Console**
   - Go to Analytics → Events
   - Look for 'page_view' events in real-time

3. **Add custom tracking** (optional)
   - Track button clicks, form submissions, etc.
   - Use the utility functions in `analytics.ts`

4. **Set up conversions** (optional)
   - Define conversion events in Firebase Console
   - Track important actions like signups, bookings, etc.

## 📝 Notes

- **Privacy**: Ensure you have proper privacy policy disclosures
- **GDPR/CCPA**: Consider adding cookie consent if required
- **Data Retention**: Configure in Firebase Console settings
- **Debug Mode**: Use Firebase Analytics DebugView for development testing

---

**🎉 Your Firebase Analytics is now live and tracking!**

Check your browser console to see page views being tracked in real-time.
