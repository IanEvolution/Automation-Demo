class LoginPageHERO {
    constructor(page) {
        this.page = page;
    }

    // ------ locators -------------

    get usernameField() {
        return this.page.getByRole('textbox', { name: 'Username' });
    }

    get passwordField() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get loginButton() {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get invalidUsername() {
        return this.page.locator('#flash');
    }

    get invalidPassword() {
        return this.page.getByText('Your password is invalid!');
    }

    // -------- actions ------------

    async fillUsername(username) {
        await this.usernameField.fill(username);
    }

    async fillPassword(password) {
        await this.passwordField.fill(password);
    }

    async loginButtonClick() {
        try {
            await this.loginButton.click();
        } catch (err) {
            throw new Error(`loginbutton locator failed — the "login" button may have changed text, role, or been removed. Original error: ${err.message}`);
        }
    }


}

module.exports = LoginPageHERO;