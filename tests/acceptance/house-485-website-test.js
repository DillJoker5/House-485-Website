// House 485 Website Acceptance Tests

import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | house 485', function (hooks) {
  // Setup the application hooks
  setupApplicationTest(hooks);

  // Tests

  // Test for visiting the home page
  test('visiting home page', async (assert) => {
    // Await till you land on the home page
    await visit('/');

    // Verify the current url is the home page's url
    assert.equal(currentURL(), '/');

    // Verify that the navigation bar exists and is setup with the correct links
    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('Home');
    assert.dom('nav a.menu-about').hasText('About Us');
    assert.dom('nav a.menu-contact').hasText('Contact Us');
    assert.dom('nav a.menu-account').hasText('Account');
    assert.dom('nav a.menu-bookmark').hasText('Bookmarks');

    // Verify basic elements of the home page
    assert.dom('h2').hasText("Welcome to Dylan's Milwaukee Housing");
    assert
      .dom('p')
      .hasText(
        'We hope you find everything you are looking for in a new home in the Milwaukee Area!'
      );

    // Verify that the app section of the home page exists
    assert.dom('.app').exists();
  });

  // Test for visiting the contact us page
  test('visiting contact us page', async (assert) => {
    // Await till you land on the contact us page
    await visit('contact');

    // Verify that the navigation bar exists and that it contains a contact us link
    assert.dom('nav').exists();
    assert.dom('nav a.menu-contact').hasText('Contact Us');

    // Verify that the current url is contact
    assert.equal(currentURL(), 'contact');

    // Verify that the contact us image exists
    assert.dom('img').exists();

    // Verify that the basic elements of the contact us page exists
    assert.dom('h2').hasText('Contact Us');
    assert
      .dom('h4')
      .hasText(
        'We would love to hear any feedback or questions from our users! Please feel free to contact us with any questions, concerns, or recommendations with the below phone number or email!'
      );
    assert.dom('address').exists();
    assert.dom('p').hasText('2520 Iris Ct Racine, WI 53402');

    // Verify that the About Us button exists
    assert.dom('.app a.button').hasText('About Us');

    // Await the click on the About Us button
    await click('.app a.button');

    // Verify that the current url is now the about page's url
    assert.equal(currentURL(), '/about');

    // Await the click on the Home button
    await click('nav a.menu-index');

    // Verify that the current url is now the home page's url
    assert.equal(currentURL(), '/');
  });

  // Test for visiting the about page
  test('visiting about page', async (assert) => {
    // Await till you land on the about page
    await visit('/about');

    // Verify that the navigation bar exists and that the navigation bar contains an About Us button
    assert.dom('nav').exists();
    assert.dom('nav a.menu-about').hasText('About Us');

    // Selector to grab all of the h4 elements on the current page
    let h4Elements = document.querySelectorAll('h4');

    // Verify that the current url is the About Us page's url
    assert.equal(currentURL(), '/about');

    // Verify basic elements exist
    assert.dom('h2').hasText("About Dylan's Milwaukee Housing");
    assert.dom('img').exists();
    assert.dom(h4Elements[0]).hasText('Class: CSC 485');
    assert
      .dom(h4Elements[1])
      .hasText(
        'Purpose: Display Local Milwaukee Houses while showing off ability to learn new technologies quickly.'
      );
    assert.dom(h4Elements[2]).hasText('Description of Project: ');
    assert.dom('ul').exists();
    assert.dom(h4Elements[3]).hasText('API Used: Realty in US');
    assert
      .dom(h4Elements[4])
      .hasText('Languages Used: JavaScript, Go, SQL');
    assert.dom(h4Elements[5]).hasText('Frameworks / Libraries Used: ');
    assert.dom('ol').exists();
    assert.dom('div').exists();
    assert
      .dom('p')
      .hasText(
        'Please click here to contact our team with any questions or concerns!'
      );

    // Verify that the Contact Us button exists
    assert.dom('.app a.button').hasText('Contact Us');

    // Await the click on the Contact Us button
    await click('.app a.button');

    // Verify that the current url is now the contact page's url
    assert.equal(currentURL(), '/contact');

    // Await the click on the Home button
    await click('nav a.menu-index');

    // Verify that the current url is now the home page's url
    assert.equal(currentURL(), '/');
  });

  // Test for navigating to the different links using the navigation bar
  test('navigating using the nav-bar', async (assert) => {
    // Await till you land on the home page
    await visit('/');

    // Verify that the navigation bar exists and is setup with the correct links
    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('Home');
    assert.dom('nav a.menu-about').hasText('About Us');
    assert.dom('nav a.menu-contact').hasText('Contact Us');
    assert.dom('nav a.menu-account').hasText('Account');
    assert.dom('nav a.menu-bookmark').hasText('Bookmarks');

    // Await the click on the About button in the navigation bar
    await click('nav a.menu-about');

    // Verify that the current url is now the about page's url
    assert.equal(currentURL(), '/about');

    // Await the click on the Contact button in the navigation bar
    await click('nav a.menu-contact');

    // Verify that the current url is now the contact page's url
    assert.equal(currentURL(), '/contact');

    // Await the click on the Account button in the navigation bar
    await click('nav a.menu-account');

    // Verify that the current url is now the account page's url
    assert.equal(currentURL(), '/account');

    // Await the click on the Home button in the navigation bar
    await click('nav a.menu-index');

    // Verify that the current url is now the home page's url
    assert.equal(currentURL(), '/');
  });

  // Test for visiting the login page
  test('visting Login Page', async (assert) => {
    // Await till you land on the login page
    await visit('/login');

    // Verify that the current url is the login page's url
    assert.equal(currentURL(), '/login');

    // Verify that the navigation bar exists with the account button
    assert.dom('nav').exists();
    assert.dom('nav a.menu-account').hasText('Account');

    // Verify that the login section exists in the current document
    assert.dom('.login').exists();

    // Await the click on the Home button
    await click('nav a.menu-index');

    // Verify that the current url is the home page's url
    assert.equal(currentURL(), '/');
  });

  // Test for visiting the register page
  test('visiting Register Page', async (assert) => {
    // Await till you land on the register page
    await visit('register');

    // Verify that the current url is the register page's url
    assert.equal(currentURL(), 'register');

    // Verify that the navigation bar exists
    assert.dom('nav').exists();

    // Verify that the register section exists in the current document
    assert.dom('.register').exists();

    // Await the click on the Home button
    await click('nav a.menu-index');

    // Verify that the current url is the home page's url
    assert.equal(currentURL(), '/');
  });
});
