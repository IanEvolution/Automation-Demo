const { Given } = require('@cucumber/cucumber');
const { getPage } = require('../playwrightUtilities');
const HomePage = require('../page-objects/HomePage');
const LoginPage = require('../page-objects/LoginPage');
const LoginPageHERO = require('../page-objects/LoginPageForHero');


Given('Open the HOME page {string}', async function(url) {
    await getPage().goto(url);
    this.HomePage = new HomePage(getPage());
})

Given ('Open the LOGIN page {string}', async function(url) {
    await getPage().goto(url);
    this.LoginPage = new LoginPage(getPage());
});

Given ('Open the LOGIN page on HERO {string}', async function(url) {
    await getPage().goto(url);
    this.LoginPageHERO = new LoginPageHERO(getPage());
});