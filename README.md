# Automated Form Testing with Playwright

This project contains end-to-end automated tests for a simple form application using **Playwright** and the **Page Object Model**.

# Requirements:
- Node.js v20.5.1 or later
- Playwright v1.53.2 (installed via npm)
- Optionally: Docker + Docker Compose

## Project Structure
- `app/` - Contains the application code
  - `index.html` - The form page
  - `index.js` - The Express server
  - `results.ejs` - The results page template
- `tests/` - Contains the test files
  - `ui.spec.ts` - UI/UX tests 
  - `navigation.spec.ts` - Navigation tests 
  - `formSubmissionValid.spec.ts` - Positive form submission tests with varying hobby  selection
  - `formSubmissionInvalid.spec.ts` - Negative validation tests for missing required fields
- `fixtures/`- Custom Playwright fixtures
  - `testFixtures.ts` - Defines formPage and resultPage fixtures
- `utils/` - Helper functions for common UI actions
  - `commonUtils.ts` - Utilities for handling dropdowns, checkboxes...
- `date/` - Test data generation utilities
  - `formDate.ts` - Functions to generate valid and invalid FormData
- `snapshots/` - Stores ARIA snapshots used in UI tests
  - `snapshots.ts` - The serialized ARIA snapshot of the form
- `pages/` - Page Object Model files
  - `form.page.ts` - FormPage class
  - `result.page.ts` - ResultPage class
-  `types/` - Shared TypeScript type definitions
  - `types.ts` - FormData interface 

## Test Scenarios

# formSubmissionValid.spec.ts - file
Valid data submission with different hobby combinations:
- Submit form with **no hobbies**
- Submit form with **one hobby**
- Submit form with **two hobbies**
- Submit form with **three hobbies**

# formSubmissionInvalid.spec.ts (negative scenario) - file
Form submission with missing required fields:
- Submit without **username**
- Submit without **password**
- Submit without **gender**
- Submit without **time**
- Submit with **all fields empty**

# navigation.spec.ts - file
Navigation & page transitions:
- Reload result page → redirects to form
- Press back → returns to **pre-filled form with correct header**
- Press back → returns to **pre-filled form with correct username**
- Direct access to `/result` returns 404 (API test)

# ui.spec.ts - file
UI/UX and ARIA structure checks:
- Correct ARIA structure on initial load
- Fields reset after reload
- Submit button is enabled on page load

---

## Installation & Run

```bash
npm install
npx playwright install   # Required: downloads browsers needed for running tests 
# npm run serve    # Starts the app on http://localhost:3000 
npm run test     # Runs all Playwright tests
npm run test:ui  # Opens the Playwright UI
npm run report # Open report