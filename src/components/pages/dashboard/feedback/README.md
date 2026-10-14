# Feedback page layout update

Replace these files in components/pages/dashboard/feedback/ (adjust the path if your folder differs):

- FeedbackPage.jsx           new layout: header, stats, then list+detail with a categories sidebar
- FeedbackHeader.jsx         compact PageHeader with a working "Request feedback" button
- FeedbackFilters.jsx        now a toolbar inside the Latest feedback card
- FeedbackCategories.jsx     compact sidebar list instead of five large cards
- LatestFeedback.jsx         accepts a `toolbar` prop, removed the duplicate queue counters
- FeedbackListItem.jsx       cleaner list rows
- FeedbackDetailContent.jsx  mentor row, side-by-side strengths and improvements

Unchanged: feedbackData.js, FeedbackSummary.jsx, FeedbackStatusBadge.jsx, RequestFeedbackDialog.jsx
