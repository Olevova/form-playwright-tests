const { chromium } = require('@playwright/test');

async function globalSetup() {
  // Make sure we have the browser installed
  const browser = await chromium.launch();
  await browser.close();
}

module.exports = globalSetup;
