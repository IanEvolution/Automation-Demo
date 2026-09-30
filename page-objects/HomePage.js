class HomePage {
    constructor(page) {
        this.page = page;
    }

    // ---- Locators ----

    get newLink() {
        return this.page.getByRole('link', { name: 'new', exact: true });
    }

    get pastLink() {
        return this.page.getByRole('link', { name: 'past' });
    }

    get timestamps() {
        return this.page.locator('span.age');
    }

    get moreLink() {
        return this.page.locator('a.morelink');
    }

    get loginLink() {
        return this.page.getByRole('link', { name: 'login' });
    }
    // ---- Actions ----

    async clickNew() {
        await this.newLink.click();
    }

    async clickPast() {
        await this.pastLink.click();
    }

    async clickMore() {
        await this.moreLink.click();
    }

    async clickLogin() {
        try {
            await this.loginLink.click();
        } catch (err) {
            throw new Error(`loginLink locator failed — the "login" link may have changed text, role, or been removed. Original error: ${err.message}`);
        }
        
    }

    // Reads up to `max` article timestamps (epoch seconds), paginating via "more" as needed.
    async collectTimestamps(max) {
        const epochs = [];

        while (epochs.length < max) {
            const rows = this.timestamps;
            const count = await rows.count();

            for (let i = 0; i < count && epochs.length < max; i++) {
                const title = await rows.nth(i).getAttribute('title') || '';
                epochs.push(Date.parse(title + 'Z') / 1000);
            }

            if (epochs.length >= max) break;
            if ((await this.moreLink.count()) === 0) break;

            await this.clickMore();
        }

        return epochs;
    }
}


module.exports = HomePage;
