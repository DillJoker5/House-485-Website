import EmberRouter from '@ember/routing/router';
import config from 'house-485-website/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('about');
  this.route('contact');
  this.route('house');
  this.route('house_img', { path: 'homeImg' });
  this.route('login');
  this.route('register');
  this.route('review');
});
