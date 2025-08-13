const { Given } = require('@cucumber/cucumber');
const { getPage } = require('../playwrightUtilities');

Given('Open the page {string}', async function (url) {
    await getPage().goto(url);
})