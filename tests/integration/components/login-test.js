import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, currentURL, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | Login', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content', async function (assert) {
    await render(hbs`<Login />`);

    assert.dom('p').hasText('No Account:');
    assert.dom('a.button').hasText('Register Here');

    assert.dom('h1').hasText('Log into your account');
    assert.dom('form').exists();
  });

  test('login button not enabled when username is not filled in', async function (assert) {
    await render(hbs`<Login />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = '';
    inputElements[20].value = 'passwordTest';

    assert.dom('.login-form-login-button').isDisabled();
  });

  test('login button not enabled when password is not filled in', async function (assert) {
    await render(hbs`<Login />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'usernameTest';
    inputElements[20].value = ''; 

    assert.dom('.login-form-login-button').isDisabled();
  });

  test('valid login', async function (assert) {
    await render(hbs`<Login />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'usernameTest'; // insert valid here
    inputElements[20].value = 'passwordTest'; // insert valid here

    assert.dom('.login-form-login-button').isNotDisabled();

    await click('.login-form-login-button');

    assert.equal(currentURL(), '/');
  });

  test('clicking register button brings user to register page', async function (assert) {
    await render(hbs`<Login />`);
    assert.equal(currentURL(), '/login');

    await click('.login button');
    assert.equal(currentURL(), '/register');
  });
});
