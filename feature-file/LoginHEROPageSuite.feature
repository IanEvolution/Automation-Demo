Feature: Test Suite for HERO Login page

    Background:
        Given Open the LOGIN page on HERO "https://the-internet.herokuapp.com/login"

    Scenario: Login fails with invalid username
    Then enter the incorrect username but correct password and click the login button
    Then assert for the user error banner "Your username is invalid!"

    Scenario: Login fails with invalid password
    Then enter the correct username with the incorrect password and click the login button
    Then assert for the password error banner "Your password is invalid!"

    Scenario: Login Successfully
    Then enter the correct user and password and click the login button
    Then assert for the secure banner