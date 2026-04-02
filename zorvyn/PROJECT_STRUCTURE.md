# Finance Dashboard Folder Structure

This project uses a feature-based structure with an atomic design component library.

## Key Ideas
- `features/` hold domain logic, pages, and slices
- `components/` are shared UI building blocks, split into `atoms`, `molecules`, `organisms`
- `app/` owns store and app-level hooks

## Structure (top-level)
- `src/app/` store setup, app hooks
- `src/components/` shared UI components (atomic design)
- `src/features/` domain features (dashboard, transactions, insights, roles)
- `src/layouts/` page layouts
- `src/pages/` app shell and route-level wrappers
- `src/hooks/` shared hooks
- `src/utils/` formatting + calculations
- `src/data/` mock/static data
- `src/constants/` enums and constant maps
- `src/services/` local storage or mock API
- `src/routes/` routing config
- `src/styles/` design tokens and base styles
- `src/types/` shared type shapes (JS or TS hints)
- `src/tests/` notes or test utilities

## Mapping to Requirements
- Dashboard overview: `features/dashboard/` + `components/organisms/*Chart*`
- Transactions: `features/transactions/` + `components/organisms/TransactionsTable`
- Role UI: `features/roles/roleSlice.js` + `components/molecules/RoleSwitch`
- Insights: `features/insights/` + `components/organisms/InsightsPanel`
- State: `app/store.js` + feature slices
