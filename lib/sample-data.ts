import type { SignalData } from "./types"

export const initialSignalData: SignalData = {
  weekEnding: "June 4, 2025",
  executiveSummary:
    "The team is on track for Q2 deliverables with the authentication system completed ahead of schedule. Executive attention needed on the data engineering dependency blocking the analytics dashboard. Resource allocation for payment integration should be prioritized to maintain momentum.",
  accomplishments: [
    "Completed user authentication system 2 days ahead of schedule",
    "Resolved 15 high-priority bugs from the backlog",
    "Finalized design specs for the new analytics dashboard",
  ],
  blockers: [
    "Waiting on data engineering team for API access (escalated to VP)",
    "Performance issues in production environment affecting ~5% of users",
  ],
  nextWeekFocus: [
    "Complete payment integration with Stripe",
    "Address performance bottlenecks in the checkout flow",
    "Begin work on analytics dashboard pending API access",
  ],
  metrics: [
    {
      name: "Sprint Completion",
      value: "92",
      unit: "%",
      progress: 92,
      trend: 5,
      context: "Up from 87% last sprint, on track for Q2 goals",
    },
    {
      name: "Bug Backlog",
      value: "23",
      unit: "",
      progress: 70,
      trend: -15,
      context: "Reduced from 38 last week, ahead of target",
    },
    {
      name: "User Engagement",
      value: "24.5",
      unit: "min",
      progress: 82,
      trend: 3,
      context: "Average session time increased by 3 minutes",
    },
    {
      name: "Conversion Rate",
      value: "3.8",
      unit: "%",
      progress: 76,
      trend: -0.2,
      context: "Slight decrease due to checkout performance issues",
    },
  ],
}
