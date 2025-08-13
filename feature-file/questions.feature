Feature: QA Wolf Questions and Automations

    Background:
        Given Open the page "https://news.ycombinator.com/"
    
    Scenario: Question 1: validate that EXACTLY the first 100 articles are sorted from newest to oldest
    Then click on the new link
    Then assert that all the articles are sorted from newest to oldest
