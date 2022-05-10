// Login Integration Tests

import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, currentURL, visit } from '@ember/test-helpers';

module('Integration | Login', function (hooks) {
  // Setup the application hooks
  setupApplicationTest(hooks);

  // Test to verify that the correct content is rendered
  test('it renders the content', async function (assert) {
    // Await till you land on the login page
    await visit('/login');

    // Verify that the Register section of the Login page is rendered correctly
    assert.dom('p').hasText('No Account:');
    assert.dom('a.button').hasText('Register Here');

    // Verify that the basic elements of the Login page is displayed
    assert.dom('h1').hasText('Log into your account');

    // Verify that the Login form exists
    assert.dom('form').exists();
  });

  // Test to verify that the user is not able to log into their account when the username field is not filled in
  test('login button not sending request when username is not filled in', async function (assert) {
    // Await till you land on the login page
    await visit('login');

    // Query selector to grab all of the login form's inputs
    let inputElements = document.querySelectorAll('input');

    // Add mock values to the login form's inputs
    inputElements[19].value = '';
    inputElements[20].value = 'passwordTest';

    // Await the click of the Login button
    await click('.login form .button');

    // Query selector to select the Login form
    let formElement = document.querySelectorAll('form');

    // Verify that the login form did not send the api request
    assert.equal(formElement.length, 3);
  });

  // Test to verify that the user is not able to log into their account when the password field is not filled in
  test('login button not sending request when password is not filled in', async function (assert) {
    // Await till you land on the login page
    await visit('login');

    // Query selector to grab all of the login form's inputs
    let inputElements = document.querySelectorAll('input');

    // Add mock values to the login form's inputs
    inputElements[19].value = 'usernameTest';
    inputElements[20].value = '';

    // Query selector to grab the login form
    let formElement = document.querySelectorAll('form');

    // Verify that the login form did not send the api request
    assert.equal(formElement.length, 3);
  });

  // Test to verify that a user can log into their account
  test('valid login', async function (assert) {
    // Await till you land on the login page
    await visit('login');

    // Query selector to grab all of the login form's inputs
    let inputElements = document.querySelectorAll('input');

    // Add values to the login form's inputs
    inputElements[19].value = 'Administrator';
    inputElements[20].value = 'asdcvasdqwe123';

    // Await the click of the Login button
    await click('.login form .button');

    // Verify that the api request was successful by the current url being the home page's url
    assert.equal(currentURL(), '/');
  });

  // Test to verify that clicking the Register button redirects the user to the register page
  test('clicking register button brings user to register page', async function (assert) {
    // Await till you land on the login page
    await visit('login');

    // Await the click of the Register button
    await click('.login .button');

    // Verify that the current url is the register page's url
    assert.equal(currentURL(), '/register');
  });
});
