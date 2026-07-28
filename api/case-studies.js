// Manual case-study content for specific projects, keyed by exact GitHub
// repo name (case-sensitive, must match the repo name on GitHub exactly).
// Not derivable from the GitHub API -- this is where you add your own
// "why I built this" narrative for flagship projects. Any repo without an
// entry here just falls back to the auto-pulled README excerpt, as before.

export const CASE_STUDIES = {
  PortfolioTracker: {
    problem:
      "I wanted an easy way to view investment portfolios and understand how each asset was performing at a glance. It's built for anyone with investments spread across multiple accounts or platforms.",
    tradeoff:
      "Integrating directly with every investment platform out there is practically impossible unless each investor has a tracker custom-built for their exact accounts. So instead, users manually enter each asset's details -- name, market, quantity, transactions -- into a CSV, which the tracker then uploads and runs the calculations on.",
    hardPart:
      "The tricky part was pulling live market prices regardless of which market an asset traded on. I worked around this using Mansa Market's live prices, which don't require an API -- much less integration work than building a custom feed per market.",
    whatIdChange:
      "Filling out a CSV by hand turned out to be tedious. I've already started on a second, improved version that keeps manual entry but does it directly inside the app instead of through a separate file.",
  },
  "Streaming-Site": {
    problem:
      "I wanted an in-house platform for video and audio calls -- one where privacy comes from actually controlling the infrastructure. The host (first user in a call) decides who can and can't join.",
    tradeoff:
      "It's still invite-only for now and doesn't yet match the polish of established video conferencing platforms -- that's actively being worked on.",
    hardPart:
      "Since it's entirely web-based, different users bring different browsers with different configurations, which made fine-tuning the app to work consistently for everyone a real challenge.",
    whatIdChange:
      "The UI/UX -- bringing it up to the level of mainstream conferencing platforms is the next big push.",
  },
};
