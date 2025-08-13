const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { initializeBrowser, initializePage, closeBrowser, getPage } = require('../playwrightUtilities');

setDefaultTimeout(20000);

Before(async function () {
    await initializeBrowser();
    await initializePage();
});

After(async function () {
    await closeBrowser();
});
