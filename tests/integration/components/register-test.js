import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, currentURL, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | Register', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content', async function (assert) {
    await render(hbs`<Register />`);

    assert.dom('.register-login-div').exists();
    assert.dom('h3').hasText('Already Have an Account?Login');

    assert.dom('h1').hasText('Register your account below');
    assert.dom('p').isNotVisible();

    assert.dom('form').exists();

    assert.dom('.register input.button').hasValue('Create Account');
  });

  test('register button not enabled when username is not filled in', async function (assert) {
    await render(hbs`<Register />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = '';
    inputElements[20].value = 'nameTest';
    inputElements[21].value = 'emailTest';
    inputElements[22].value = 'passwordTest';

    let formElement = document.querySelectorAll('form');

    assert.equal(formElement.length, 3);
  });

  test('register button not enabled when name is not filled in', async function (assert) {
    await render(hbs`<Register />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'usernameTest';
    inputElements[20].value = '';
    inputElements[21].value = 'emailTest';
    inputElements[22].value = 'passwordTest';

    let formElement = document.querySelectorAll('form');

    assert.equal(formElement.length, 3);
  });

  test('register button not enabled when email is not filled in', async function (assert) {
    await render(hbs`<Register />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'usernameTest';
    inputElements[20].value = 'nameTest';
    inputElements[21].value = '';
    inputElements[22].value = 'passwordTest';

    let formElement = document.querySelectorAll('form');

    assert.equal(formElement.length, 3);
  });

  test('register button not enabled when password is not filled in', async function (assert) {
    await render(hbs`<Register />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'usernameTest';
    inputElements[20].value = 'nameTest';
    inputElements[21].value = 'emailTest';
    inputElements[22].value = '';

    let formElement = document.querySelectorAll('form');

    assert.equal(formElement.length, 3);
  });

  test('valid regristration', async function (assert) {
    await render(hbs`<Register />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'usernameTest'; // insert valid here
    inputElements[20].value = 'nameTest'; // insert valid here
    inputElements[21].value = 'emailTest'; // insert valid here
    inputElements[22].value = 'passwordTest'; // insert valid here

    let formElement = document.querySelectorAll('form');

    assert.equal(formElement.length, 3);

    await click('.register input.button');

    assert.dom('p').isVisible();
  });

  test('clicking login button brings user to login page', async function (assert) {
    await render(hbs`<Register />`);

    await click('.register-login-div a.button');
    assert.equal(currentURL(), '/login');
  });
});
