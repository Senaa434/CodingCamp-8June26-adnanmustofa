# Requirements Document

## Introduction

The Expense & Budget Visualizer is a client-side web application that allows users to track personal expenses and budgets through a clean, minimal interface. Built with plain HTML, CSS, and Vanilla JavaScript, it stores all data in the browser's Local Storage — no server or backend required. Users can add and manage transactions, set category budgets, visualize spending through charts, add custom categories, view monthly summaries, sort transactions, receive visual alerts when spending exceeds limits, and switch between dark and light modes.

## Glossary

- **App**: The Expense & Budget Visualizer web application running in the browser.
- **Transaction**: A single record of income or expense, consisting of a description, amount, category, type (income/expense), and date.
- **Category**: A label used to group transactions (e.g., Food, Transport, Salary). Can be a default or user-defined custom category.
- **Budget**: A spending limit set by the user for a specific category within a calendar month.
- **Local_Storage**: The browser's Local Storage API used to persist all application data client-side.
- **Dashboard**: The main view of the App displaying the balance summary, charts, and recent transactions.
- **Transaction_List**: The UI component displaying all transactions, with options to filter and sort.
- **Budget_Panel**: The UI component where users set and view budgets per category.
- **Monthly_Summary**: A view that aggregates income, expenses, and per-category spending for a selected month.
- **Chart**: A visual representation (bar or pie chart) rendered on an HTML canvas element showing spending by category.
- **Dark_Mode**: A color scheme using dark backgrounds and light text.
- **Light_Mode**: The default color scheme using light backgrounds and dark text.

---

## Requirements

### Requirement 1: Add and Manage Transactions

**User Story:** As a user, I want to add, view, and delete transactions, so that I can keep an accurate record of my income and expenses.

#### Acceptance Criteria

1. THE App SHALL provide a form with fields for description (text), amount (positive number), category (selection), type (income or expense), and date.
2. WHEN the user submits the transaction form with all valid fields, THE App SHALL save the transaction to Local_Storage and display it in the Transaction_List.
3. IF the user submits the transaction form with an empty description, zero or negative amount, or no category selected, THEN THE App SHALL display a descriptive validation error message and SHALL NOT save the transaction.
4. WHEN the user clicks the delete action on a transaction, THE App SHALL remove the transaction from Local_Storage and update the Transaction_List and Dashboard without a page reload.
5. THE App SHALL persist all transactions in Local_Storage so that THE App SHALL restore all transactions when the browser tab is closed and reopened.

---

### Requirement 2: Balance Summary Dashboard

**User Story:** As a user, I want to see my total income, total expenses, and net balance at a glance, so that I can quickly understand my financial position.

#### Acceptance Criteria

1. THE Dashboard SHALL display three summary figures: total income, total expenses, and net balance (income minus expenses), calculated from all transactions in Local_Storage.
2. WHEN a transaction is added or deleted, THE Dashboard SHALL update all three summary figures immediately without a page reload.
3. THE App SHALL display the net balance figure in a visually distinct positive style WHEN net balance is greater than or equal to zero, and in a visually distinct negative style WHEN net balance is less than zero.

---

### Requirement 3: Spending Visualization by Category

**User Story:** As a user, I want to see a chart of my spending broken down by category, so that I can understand where my money is going.

#### Acceptance Criteria

1. THE Dashboard SHALL render a Chart visualizing expense totals grouped by Category using an HTML canvas element.
2. WHEN a transaction is added or deleted, THE Chart SHALL re-render to reflect the updated category totals without a page reload.
3. THE Chart SHALL display each Category with a distinct color and a legend identifying each Category name.
4. WHILE no expense transactions exist, THE Chart SHALL display a placeholder message indicating no expense data is available.

---

### Requirement 4: Budget Management per Category

**User Story:** As a user, I want to set a monthly spending budget for each category, so that I can control how much I spend in each area.

#### Acceptance Criteria

1. THE Budget_Panel SHALL allow the user to enter a positive numeric budget amount for each Category.
2. WHEN the user saves a budget for a Category, THE App SHALL store the budget value in Local_Storage and display it alongside the Category's current monthly spending in the Budget_Panel.
3. THE App SHALL persist all budget values in Local_Storage so that THE App SHALL restore all budgets when the browser tab is closed and reopened.
4. IF the user enters a zero or negative value as a budget amount, THEN THE App SHALL display a validation error and SHALL NOT save the budget.

---

### Requirement 5: Custom Categories

**User Story:** As a user, I want to add my own spending categories, so that I can organize transactions in a way that fits my lifestyle.

#### Acceptance Criteria

1. THE App SHALL provide an input field and a submit action that allows the user to create a new Category with a user-defined name.
2. WHEN the user submits a valid category name, THE App SHALL add the new Category to Local_Storage and make it available in the category selection field of the transaction form and the Budget_Panel immediately.
3. IF the user submits an empty category name or a name that already exists (case-insensitive), THEN THE App SHALL display a descriptive validation error and SHALL NOT create a duplicate Category.
4. THE App SHALL persist all custom categories in Local_Storage so that THE App SHALL restore all custom categories when the browser tab is closed and reopened.

---

### Requirement 6: Monthly Summary View

**User Story:** As a user, I want to view a summary of my income, expenses, and per-category spending for a specific month, so that I can review my finances over time.

#### Acceptance Criteria

1. THE Monthly_Summary SHALL provide a month and year selector that allows the user to choose any month for which transaction data exists.
2. WHEN the user selects a month, THE Monthly_Summary SHALL display total income, total expenses, net balance, and a per-Category expense breakdown for that selected month.
3. THE Monthly_Summary SHALL display each Category's total spending alongside its budget for that month, WHEN a budget has been set for that Category.
4. WHILE no transactions exist for the selected month, THE Monthly_Summary SHALL display a message indicating no data is available for that period.

---

### Requirement 7: Sort Transactions

**User Story:** As a user, I want to sort my transaction list by amount or by category, so that I can quickly find and compare transactions.

#### Acceptance Criteria

1. THE Transaction_List SHALL provide a sort control with the following options: date (newest first, default), date (oldest first), amount (highest first), amount (lowest first), and category (A–Z).
2. WHEN the user selects a sort option, THE Transaction_List SHALL re-render all displayed transactions in the selected order immediately without a page reload.
3. THE Transaction_List SHALL retain the selected sort option for the duration of the browser session.

---

### Requirement 8: Highlight Spending Over Budget Limit

**User Story:** As a user, I want to be visually alerted when my spending in a category exceeds my set budget, so that I can take corrective action promptly.

#### Acceptance Criteria

1. WHEN the total expense amount for a Category in the current month meets or exceeds the budget set for that Category, THE Budget_Panel SHALL render that Category's row with a distinct visual highlight (e.g., red background or warning icon).
2. WHEN a new expense transaction is added and causes a Category's monthly total to meet or exceed its budget, THE App SHALL display a non-blocking notification message identifying the over-budget Category.
3. THE App SHALL remove the over-budget visual highlight for a Category WHEN the Category's monthly expense total falls below its budget (e.g., after a transaction is deleted).

---

### Requirement 9: Dark/Light Mode Toggle

**User Story:** As a user, I want to switch between dark and light display modes, so that I can use the app comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE App SHALL provide a clearly labeled toggle control that switches between Dark_Mode and Light_Mode.
2. WHEN the user activates Dark_Mode, THE App SHALL apply a dark color scheme to all UI components immediately without a page reload.
3. WHEN the user activates Light_Mode, THE App SHALL apply the default light color scheme to all UI components immediately without a page reload.
4. THE App SHALL persist the user's selected mode in Local_Storage so that THE App SHALL restore the selected mode when the browser tab is closed and reopened.

---

### Requirement 10: Single-File Architecture and Browser Compatibility

**User Story:** As a developer, I want the application to use exactly one CSS file and one JavaScript file, so that the codebase stays clean, maintainable, and easy to deploy via GitHub Pages.

#### Acceptance Criteria

1. THE App SHALL be structured with a single `index.html` file, a single CSS file located at `css/style.css`, and a single JavaScript file located at `js/app.js`.
2. THE App SHALL function correctly in the current stable versions of Chrome, Firefox, Edge, and Safari without requiring any build tools, package managers, or backend servers.
3. THE App SHALL load and become interactive within 3 seconds on a standard broadband connection with no external network dependencies (no CDN-hosted libraries or fonts).
4. THE App SHALL use only native browser APIs (DOM, Local Storage, Canvas) and SHALL NOT depend on any external JavaScript frameworks or CSS frameworks.
