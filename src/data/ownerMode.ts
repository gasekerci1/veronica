// Owner-only tools (business settings, contractor quote builder) are hidden
// from the public. Open the site with ?owner=1 to show them.
export const IS_OWNER_MODE =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('owner');

// Quote requests are emailed via FormSubmit (formsubmit.co).
// QUOTE_CC is optional: add Veronica's email here to copy her on every enquiry.
export const QUOTE_TO = 'garry@aishowroom.net';
export const QUOTE_CC = 'veronicarolles@gmail.com';
export const QUOTE_SMS_NUMBER = '0423715078';
