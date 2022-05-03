import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, currentURL, visit } from '@ember/test-helpers';

module('Integration | Login', function (hooks) {
  setupApplicationTest(hooks);

  test('it renders the content', async function (assert) {
    await visit('/login');

    assert.dom('p').hasText('No Account:');
    assert.dom('a.button').hasText('Register Here');

    assert.dom('h1').hasText('Log into your account');
    assert.dom('form').exists();
  });

  test('login button not sending request when username is not filled in', async function (assert) {
    await visit('login');

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = '';
    inputElements[20].value = 'passwordTest';

    await click('.login form .button');

    let formElement = document.querySelectorAll('form');
    console.log(formElement)

    assert.equal(formElement.length, 3);
  });

  test('login button not sending request when password is not filled in', async function (assert) {
    await visit('login');

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'usernameTest';
    inputElements[20].value = ''; 

    let formElement = document.querySelectorAll('form');

    assert.equal(formElement.length, 3);
  });

  test('valid login', async function (assert) {
    await visit('login');

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'Administrator';
    inputElements[20].value = 'asdcvasdqwe123';

    await click('.login form .button');

    assert.equal(currentURL(), '/');
  });

  test('clicking register button brings user to register page', async function (assert) {
    await visit('login');

    await click('.login .button');
    assert.equal(currentURL(), '/register');
  });
});
