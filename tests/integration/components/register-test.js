import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, currentURL, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | Register', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the content', async function (assert) {
        await render(hbs`<Register />`);

        let labelElements = document.querySelectorAll('label');
        let inputElements = document.querySelectorAll('input');

        assert.dom('.register-login-div').exists();
        assert.dom('h3').hasText('Already Have an Account?');
        assert.dom('.register-login-div a.button').hasText('Login');

        assert.dom('h1').hasText('Register your account below');
        assert.dom('p').isNotVisible();

        assert.dom('form').exists();
        assert.dom(labelElements[0]).hasText('UserName: ');
        assert.dom(inputElements[0]).exists();
        assert.dom(labelElements[1]).hasText('Name: ');
        assert.dom(inputElements[1]).exists();
        assert.dom(labelElements[2]).hasText('Email: ');
        assert.dom(inputElements[2]).exists();
        assert.dom(labelElements[3]).hasText('Password: ');
        assert.dom(inputElements[3]).exists();

        assert.dom('.register .button').hasValue('Create Account');
    });

    test('register button not enabled when username is not filled in', async function (assert) {
        await render(hbs`<Register />`);
        
        this.$('input')[1].val('nameTest');
        this.$('input')[2].val('emailTest');
        this.$('input')[3].val('passwordTest');

        assert.dom('.register button').isDisabled();
    });

    test('register button not enabled when name is not filled in', async function (assert) {
        await render(hbs`<Register />`);

        this.$('input')[0].val('usernameTest');
        this.$('input')[2].val('emailTest');
        this.$('input')[3].val('passwordTest');

        assert.dom('.register button').isDisabled();
    });

    test('register button not enabled when email is not filled in', async function (assert) {
        await render(hbs`<Register />`);

        this.$('input')[0].val('usernameTest');
        this.$('input')[1].val('nameTest');
        this.$('input')[3].val('passwordTest');
                
        assert.dom('.register button').isDisabled();
    });

    test('register button not enabled when password is not filled in', async function (assert) {
        await render(hbs`<Register />`);

        this.$('input')[0].val('nameTest');
        this.$('input')[1].val('usernameTest');
        this.$('input')[2].val('emailTest');
        
        assert.dom('.register button').isDisabled();
    });

    test('valid regristration', async function (assert) {
        await render(hbs`<Register />`);

        this.$('input')[0].val('usernameTest'); // insert valid here
        this.$('input')[1].val('nameTest'); // insert valid here
        this.$('input')[2].val('emailTest'); // insert valid here
        this.$('input')[3].val('passwordTest'); // insert valid here
                
        assert.dom('.register .button').isNotDisabled();

        await click('.register .button');

        assert.dom('p').isVisible();
    });

    test('clicking login button brings user to login page', async function (assert) {
        await render(hbs`<Register />`);
        assert.equal(currentURL(), '/register');

        await click('.register-login-div-button');
        assert.equal(currentURL(), '/login');
    });
});