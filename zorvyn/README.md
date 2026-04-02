# Finance Dashboard UI

This is a small finance dashboard built with Vite + React and a feature-based folder structure. The UI is focused on clarity and simple interactions, with mock data and frontend-only logic.

## Setup

1. Install dependencies

   npm install

2. Run the dev server

   npm run dev

3. Open the app

   http://localhost:5173/

## What’s inside

- Dashboard overview with summary cards, trend chart, and category breakdown
- Transactions list with search, filters, sorting, grouping, and export
- Insights page with quick highlights and charts
- Auth demo with role selection (Viewer/Admin)
- Role-based UI changes (Admin gets add action)
- Dark mode via theme tokens
- LocalStorage persistence for transactions
- Mock API load for transactions

## State Management

Redux Toolkit manages:
- transactions list
- filters (search, type, category, date range, grouping)
- auth + role + username

## Folder Structure (short)

- src/app
  store setup and hooks
- src/components
  shared UI components (atoms/molecules/organisms)
- src/features
  domain features (dashboard, transactions, insights, auth, roles)
- src/data
  mock data
- src/services
  mock API + local storage helpers
- src/utils
  helpers (theme, validation, export)

## Notes

- This is frontend only (no backend)
- All data is mock data
- Auth is simulated with localStorage + Redux

If you want anything cleaned up or simplified, just ask.
