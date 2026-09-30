class SecurePage {
    constructor(page) {
        this.page = page;
    }

    // -------- locators ------------

    get loggedInSuccessfullyBanner() {
        return this.page.locator('#flash');
    }
}

module.exports = SecurePage;