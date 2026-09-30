const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { initializeBrowser, initializePage, closeBrowser, getPage } = require('../playwrightUtilities');
const HomePage = require('../page-objects/HomePage');
const path = require('path');

setDefaultTimeout(20000);

Before(async function () {
    await initializeBrowser();
    await initializePage();
    // create page objects once per scenario and attach to the Cucumber world
    this.home = new HomePage(getPage());
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await getPage().screenshot({
      path: path.join('reports', 'screenshots', `${scenario.pickle.name.replace(/[^a-z0-9]/gi, '_')}.png`)
    });
    this.attach(screenshot, 'image/png');
  }
  await closeBrowser();
});
