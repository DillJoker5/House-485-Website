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

  test('login button not sending request when username is not filled in', async function (assert) {
    await render(hbs`<Login />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = '';
    inputElements[20].value = 'passwordTest';

    await click('.login form .button');

    let formElement = document.querySelectorAll('form');
    console.log(formElement)

    assert.equal(formElement.length, 3);
  });

  test('login button not sending request when password is not filled in', async function (assert) {
    await render(hbs`<Login />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'usernameTest';
    inputElements[20].value = ''; 

    let formElement = document.querySelectorAll('form');

    assert.equal(formElement.length, 3);
  });

  /*test('valid login', async function (assert) {
    await render(hbs`<Login />`);

    let inputElements = document.querySelectorAll('input');

    inputElements[19].value = 'Administrator'; // insert valid here
    inputElements[20].value = 'asdcvasdqwe123'; // insert valid here

    await click('.login form .button');

    assert.equal(currentURL(), '/');
  });*/

  test('clicking register button brings user to register page', async function (assert) {
    await render(hbs`<Login />`);

    await click('.login .button');
    assert.equal(currentURL(), '/register');
  });
});
