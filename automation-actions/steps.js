const { When, Then } = require('@cucumber/cucumber');
const { getPage } = require('../playwrightUtilities');
const HomePage = require('../page-objects/HomePage');
const LoginPage = require('../page-objects/LoginPage');
const LoginPageHERO = require('../page-objects/LoginPageForHero');
const SecurePage = require('../page-objects/SecurePage');
const assert = require('assert');
const { expect } = require('@playwright/test');


// QUESTION 1 ------------------------------------------------

When('click on the new button', async function () {
    await this.home.clickNew();
});

Then('assert that all the articles are sorted from newest to oldest', async function () {
    const epochs = await this.home.collectTimestamps(100);

    // NEW: fail clearly if any timestamp couldn't be read
    const bad = epochs.findIndex(e => !Number.isFinite(e));
    if (bad !== -1) {
        throw new Error(`Could not parse timestamp for article ${bad + 1}. Page markup may have changed.`);
    }

    for (let i = 1; i < epochs.length; i++) {
        if (!(epochs[i - 1] >= epochs[i])) {
            const before = epochs[i - 1];
            const after = epochs[i];
            const snapshot = epochs.slice(Math.max(0, i - 5), i + 5);
            throw new Error(
                `Timestamps out of order at index ${i - 1} -> ${i}: ${before} < ${after}. Context: ${JSON.stringify(snapshot)}`
            );
        }
    }
});

// --------- Test my POM ----------------

Then('assert for create account', async function () {
  const text = await this.LoginPage.createAccountHeader.textContent();
  assert.equal(text, 'Create Account');
});

// ---------------- HeroApp suite --------------

Then('enter the incorrect username but correct password and click the login button', async function() {
    await this.LoginPageHERO.fillUsername('blahblah');
    await this.LoginPageHERO.fillPassword(process.env.HERO_PASSWORD);
    await this.LoginPageHERO.loginButtonClick();
});

Then('assert for the user error banner {string}', async function(expected) {
    await expect(this.LoginPageHERO.invalidUsername).toBeVisible();
    const actual = await this.LoginPageHERO.invalidUsername.textContent();
    assert(actual.includes(expected));
});

Then('enter the correct username with the incorrect password and click the login button', async function() {
    await this.LoginPageHERO.fillUsername(process.env.HERO_USERNAME);
    await this.LoginPageHERO.fillPassword('blahblah');
    await this.LoginPageHERO.loginButtonClick();
});

Then('assert for the password error banner {string}', async function(expected) {
    await expect(this.LoginPageHERO.invalidPassword).toBeVisible();
    const actual = await this.LoginPageHERO.invalidPassword.textContent();
    assert.equal(actual, expected); // --------------------------------------------- fails on purpose to show error handeling
});

Then('enter the correct user and password and click the login button', async function() {
    await this.LoginPageHERO.fillUsername(process.env.HERO_USERNAME);
    await this.LoginPageHERO.fillPassword(process.env.HERO_PASSWORD);
    await this.LoginPageHERO.loginButtonClick();
});

Then('assert for the secure banner', async function() {
  const securePage = new SecurePage(getPage());
  await expect(securePage.loggedInSuccessfullyBanner).toBeVisible(); // wait FIRST, on the LOCATOR
  const expected = await securePage.loggedInSuccessfullyBanner.textContent(); // THEN read the text
  assert(expected.includes('You logged into a secure area!'));
});

/*

npx playwright codegen https://news.ycombinator.com/

node generate-report.js

*/