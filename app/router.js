// Router

import EmberRouter from '@ember/routing/router';
import config from 'house-485-website/config/environment';

export default class Router extends EmberRouter {
  // Create the router with the location and root url from the config file
  location = config.locationType;
  rootURL = config.rootURL;
}

// Create a map of all of the route's in the app
Router.map(function () {
  // All routes that are the same as its name
  this.route('about');
  this.route('account');
  this.route('contact');
  this.route('house');
  this.route('login');
  this.route('logout');
  this.route('register');
  this.route('review');
  this.route('bookmark', { path: '/bookmark' });

  // All routes that are different then its name
  this.route('home', { path: '/' });
  this.route('house', { path: '/:property_id' });
});
