# Leaderboard Clone Report

## Tools used
- DeepSeek for creating prompts
- Cursor AI (GPT-5.x)
- Browser screenshots (design reference)
- Font Awesome (icons) and Google Fonts (Inter) via CDN

## Approach
- Recreated the layout by matching the screenshots’ hierarchy and spacing:
  - Header title + subtitle
  - Filter bar with dropdown-style controls and search input
  - Top 3 “podium” section (2 / 1 / 3) with avatars + rank badges + score pills
  - Ranked list below as card rows with “TOTAL” score and star icon
- Replaced any employee-like data with a fixed Forbes-inspired mock dataset (names + realistic-looking internal-style codes).
- Implemented client-side interactions in vanilla JS:
  - Default sorting by `score` descending
  - Live search by name (case-insensitive)
  - Public Speaking toggle (demo filter)
  - Year/Quarter dropdown item clicks log a placeholder message
- Achieved responsive behavior using CSS grid + media queries:
  - Filters wrap on smaller widths
  - Podium stacks to a single column on narrow screens
  - List rows simplify on mobile (hide the “stars” mini column)

## Compliance
- No real corporate data, internal employee names, titles, or photos are used.
- All people shown are Forbes-inspired public personas with fictional department codes and roles.
- Avatars are placeholders (initials), not real photos.

## Link to GitHub Pages
https://github.com/kholova/AI-Challenge-2-0---Group-2.git

