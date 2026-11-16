# COMP 3123 — Lab Week 10

React data entry form matching the supplied assignment layout.

## Run on Windows or macOS
1. Extract labweek10.zip.
2. Open the extracted labweek10 folder in VS Code.
3. Open Terminal > New Terminal in that folder.
4. Run:

```sh
npm install
npm start
```

Open http://localhost:3000 if it does not open automatically.

## Try the application
Enter email, name, address, city, province and postal code. Address 2 is optional.
Check “Agree Terms & Condition?” and click Submit. The values appear below the
form, using the six labels required by Part II. Address 2 is appended to Address
when supplied. Editing fields only changes the result after another submission.
Required fields and email format use browser validation.

Example data from the assignment:
- Email: Pritesh.patel2@georgebrown.ca
- Name: Pritesh Patel
- Address: 160 Kendal Ave
- City: Toronto
- Province: Ontario
- Postal Code: M5R 1M3

## Main files
- src/App.js: controlled inputs, useState, change/submit handlers and results.
- src/App.css: green border, layout, styling and mobile layout.
- src/index.js: renders the React application.

## GitHub repository
Create an empty GitHub repository named labweek10. Do not initialize it with a
README, license or .gitignore. In the extracted project terminal run the commands
below, replacing YOUR_USERNAME with your GitHub username:

```sh
git init
git add .
git commit -m "Complete React Lab Week 10"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/labweek10.git
git push -u origin main
```

## Blackboard submission
- Upload labweek10.zip (node_modules is excluded).
- Upload screenshots showing the form, submitted output and source code.
- Paste your actual GitHub repository URL.
- Review and understand the code before submitting.

This is a react-scripts/Create React App style project, as requested by the lab.
Build command: npm run build. You do not need to run create-react-app again.

## Taking your screenshots
1. Run npm start and maximize the browser. Press Windows+Shift+S (Windows) or
   Command+Shift+4 (Mac) to capture the empty form.
2. Enter the example values above, agree to the terms and submit. Capture the
   filled form with the results below it (zoom out if needed).
3. In VS Code, open src/App.js and capture the code. Use multiple screenshots
   if needed to show the input fields and submission/results sections.

## Validation performed
- npm install completed and npm run build compiled successfully.
- A DOM-based React check verified the controlled fields, province selection,
  checkbox and six submitted result rows, including optional Address 2.
- Browser screenshot capture was unavailable in the preparation environment;
  take and review the required screenshots locally before submission.
