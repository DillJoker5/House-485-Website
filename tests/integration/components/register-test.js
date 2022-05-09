// Register Integration Tests

import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, currentURL, visit } from '@ember/test-helpers';

module('Integration | Register', function (hooks) {
  // Setup the application hooks
  setupApplicationTest(hooks);

  // Test to verify that the correct content is rendered
  test('it renders the content', async function (assert) {
    // Await till you land on the register page
    await visit('register')

    // Verify that the login div and text exists
    assert.dom('.register-login-div').exists();
    assert.dom('h3').hasText('Already Have an Account?Login');

    // Verify that the basic elements of the registration page exists
    assert.dom('h1').hasText('Register your account below');
    assert.dom('p').isNotVisible();

    // Verify that the registration form exists
    assert.dom('form').exists();

    // Verify that the register button has the correct value
    assert.dom('.register input.button').hasValue('Create Account');
  });

  // Test to verify that the user is not able to register their account if the username field is not filled in
  test('register button not enabled when username is not filled in', async function (assert) {
    // Await till you land on the register page
    await visit('register')

    // Query selector to grab all of the register form's inputs
    let inputElements = document.querySelectorAll('input');

    // Add mock values to the register form's inputs
    inputElements[19].value = '';
    inputElements[20].value = 'nameTest';
    inputElements[22].value = 'passwordTest';

    // Query selector to grab the register form
    let formElement = document.querySelectorAll('form');

    // Verify that the register form did not send the api request
    assert.equal(formElement.length, 3);
  });

  // Test to verify that the user is not able to register their account if the name field is not filled in
  test('register button not enabled when name is not filled in', async function (assert) {
    // Await till you land on the register page
    await visit('register')

    // Query selector to grab all of the register form's inputs
    let inputElements = document.querySelectorAll('input');

    // Add mock values to the register form's inputs
    inputElements[19].value = 'usernameTest';
    inputElements[20].value = '';
    inputElements[22].value = 'passwordTest';

    // Query selector to grab the register form
    let formElement = document.querySelectorAll('form');

    // Verify that the register form did not send the api request
    assert.equal(formElement.length, 3);
  });

  // Test to verify that the user is not able to register their account if the password field is not filled in
  test('register button not enabled when password is not filled in', async function (assert) {
    // Await till you land on the register page
    await visit('register')

    // Query selector to grab all of the register form's inputs
    let inputElements = document.querySelectorAll('input');

    // Add mock values to the register form's inputs
    inputElements[19].value = 'usernameTest';
    inputElements[20].value = 'nameTest';
    inputElements[22].value = '';

    // Query selector to grab the register form
    let formElement = document.querySelectorAll('form');

    // Verify that the register form did not send the api request
    assert.equal(formElement.length, 3);
  });

  // Test to verify that a user can register their account
  test('valid regristration', async function (assert) {
    // Await till you land on the register page
    await visit('register')

    // Query selector to grab all of the register form's inputs
    let inputElements = document.querySelectorAll('input');

    // Add mock values to the register form's inputs
    inputElements[19].value = 'usernameTest';
    inputElements[20].value = 'nameTest';
    inputElements[21].value = 'passwordTest';

    // Query selector to grab the register form
    let formElement = document.querySelectorAll('form');

    // Verify that the register form did not send the api request yet
    assert.equal(formElement.length, 3);

    // Click on the "Create Account" button
    await click('.register input.button');

    // Verify that the api request worked by redirecting the user to the login page
    assert.equal(currentURL(), '/login')
  });

  // Test to verify that clicking the Login button redirects the user to the Login page
  test('clicking login button brings user to login page', async function (assert) {
    // Await till you land on the register page
    await visit('register')

    // Await the click of the Login button
    await click('.register-login-div a.button');

    // Verify that the current url is the login page's url
    assert.equal(currentURL(), '/login');
  });
});
