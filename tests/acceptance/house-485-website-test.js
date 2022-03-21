import { module, test } from 'qunit';
import { click, find, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | house 485', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting home page', async (assert) => {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('Home');
    assert.dom('nav a.menu-about').hasText('About Us');
    assert.dom('nav a.menu-contact').hasText('Contact Us');
    assert.dom('nav a.menu-login').hasText('Login');

    assert.dom('h2').hasText("Welcome to Dylan's Milwaukee Housing");
    assert
      .dom('p')
      .hasText(
        'We hope you find everything you are looking for in a new home in the Milwaukee Area!'
      );
    assert.dom('.app').exists();
  });

  test('visiting contact us page', async (assert) => {
    await visit('contact');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-contact').hasText('Contact Us');

    assert.equal(currentURL(), 'contact');
    assert.dom('img').exists();
    assert.dom('h2').hasText('Contact Us');
    assert
      .dom('h4')
      .hasText(
        'We would love to hear any feedback or questions from our users! Please feel free to contact us with any questions, concerns, or recommendations with the below phone number or email!'
      );
    assert.dom('address').exists();
    assert.dom('p').hasText('2520 Iris Ct Racine, WI 53402');

    assert.dom('.app a.button').hasText('About Us');
    await click('.app a.button');
    assert.equal(currentURL(), '/about');

    await click('nav a.menu-index');
    assert.equal(currentURL(), '/');
  });

  test('visiting about page', async (assert) => {
    await visit('/about');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-about').hasText('About Us');

    let h4Elements = document.querySelectorAll('h4');

    assert.equal(currentURL(), '/about');
    assert.dom('h2').hasText("About Dylan's Milwaukee Housing");
    assert.dom('img').exists();
    assert.dom(h4Elements[0]).hasText('Class: CSC 485');
    assert
      .dom(h4Elements[1])
      .hasText(
        'Purpose: Display Local Milwaukee Houses while showing off ability to learn new technologies quickly.'
      ); // insert here
    assert.dom(h4Elements[2]).hasText('Description of Project: ');
    assert.dom('ul').exists();
    assert.dom(h4Elements[3]).hasText('API Used: Realty in US');
    assert
      .dom(h4Elements[4])
      .hasText('Languages Used: JavaScript, Python, SQL');
    assert.dom(h4Elements[5]).hasText('Frameworks / Libraries Used: ');
    assert.dom('ol').exists();
    assert.dom('div').exists();
    assert
      .dom('p')
      .hasText(
        'Please click here to contact our team with any questions or concerns!'
      );

    assert.dom('.app a.button').hasText('Contact Us');
    await click('.app a.button');
    assert.equal(currentURL(), '/contact');

    await click('nav a.menu-index');
    assert.equal(currentURL(), '/');
  });

  test('navigating using the nav-bar', async (assert) => {
    await visit('/');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('Home');
    assert.dom('nav a.menu-about').hasText('About Us');
    assert.dom('nav a.menu-contact').hasText('Contact Us');
    assert.dom('nav a.menu-login').hasText('Login');

    await click('nav a.menu-about');
    assert.equal(currentURL(), '/about');

    await click('nav a.menu-contact');
    assert.equal(currentURL(), '/contact');

    await click('nav a.menu-login');
    assert.equal(currentURL(), '/login');

    await click('nav a.menu-index');
    assert.equal(currentURL(), '/');
  });

  test('visting Login Page', async (assert) => {
    await visit('/login');
    assert.equal(currentURL(), '/login');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-login').hasText('Login');

    assert.dom('.login').exists();

    await click('nav a.menu-index');
    assert.equal(currentURL(), '/');
  });

  test('visiting Register Page', async (assert) => {
    await visit('register');
    assert.equal(currentURL(), 'register');

    assert.dom('nav').exists();

    assert.dom('.register').exists();

    await click('nav a.menu-index');
    assert.equal(currentURL(), '/');
  });
});
