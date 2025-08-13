const { Then } = require('@cucumber/cucumber');
const { getPage } = require('../playwrightUtilities');
const assert = require('assert');

// QUESTION 1 ------------------------------------------------

Then('click on the new link', async function () {
    await getPage().getByRole('link', { name: 'new', exact: true }).click();
});

Then('assert that all the articles are sorted from newest to oldest', async function () {
    const timeStamps = getPage().locator('span.age');
    const count = await timeStamps.count();
    const timeStampCode = [];

    for (let i = 0; i < Math.min(100, count); i++) {
        const title = await timeStamps.nth(i).getAttribute('title');
        const [, code] = title.split(' ');
        timeStampCode.push(Number(code));
    }

    for (let i = 1; i < timeStampCode.length; i++) {
        assert(timeStampCode[i - 1] >= timeStampCode[i]);
    }
});


/*
npm run test
npx playwright codegen https://news.ycombinator.com/
*/