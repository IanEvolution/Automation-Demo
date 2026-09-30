class LoginPage {
    constructor(page) {
        this.page = page;
    }

    // ------ Locators ---------

    get loginHeader() {
        return this.page.getByText('Login', { exact: true });
    }

    get userNameFieldLogin() {
        return this.page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]');
    }

    get passwordFieldLogin() {
        return this.page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]');
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'login' });
    }

    get forgotPasswordLink() {
        return this.page.getByRole('link', { name: 'Forgot your password?' });
    }

    get createAccountHeader() {
        return this.page.getByText('Create Account', { exact: true });
    }

    get userNameFieldCreate() {
        return this.page.locator('form').filter({ hasText: 'username:password: create' }).locator('input[name="acct"]');
    }

    get passwordFieldCreate() {
        return this.page.locator('form').filter({ hasText: 'username:password: create' }).locator('input[name="pw"]');
    }

    get createAccountButton() {
        return this.page.getByRole('button', { name: 'create account' });
    }


    // ------ Actions ---------

    async fillUsernameLogin(username) {
        await this.userNameFieldLogin.fill(username);
    }

    async fillPasswordLogin(password) {
        await this.passwordFieldLogin.fill(password);
    }

    async loginButtonClick() {
        await this.loginButton.click();
    }

    async forgotPasswordLinkClick() {
        await this.forgotPasswordLink.click();
    }

    async fillUsernameCreate(username) {
        await this.userNameFieldCreate.fill(username);
    }

    async fillPasswordCreate(password) {
        await this.passwordFieldCreate.fill(password);
    }

    async createAccountButtonClick() {
        await this.createAccountButton.click();
    }
}

module.exports = LoginPage;