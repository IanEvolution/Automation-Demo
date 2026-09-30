require('dotenv').config();
const { chromium } = require('playwright');
let browser = null;
let page = null;
const defaultTimeout = Number(process.env.DEFAULT_TIMEOUT) || 20000;

async function initializeBrowser() {
    if(!browser) {
        browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' });
    }
}

async function initializePage() {
    if (browser && !page) {
        page = await browser.newPage();
        page.setDefaultTimeout(defaultTimeout);
    }
}

async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
        page = null;
    }
}

function getPage() {
    if (!page) {
        throw new Error('page has not been initialized');
    }
    return page;
}

module.exports = {
    initializeBrowser,
    initializePage,
    closeBrowser,
    getPage
}