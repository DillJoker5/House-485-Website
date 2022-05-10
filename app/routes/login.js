// Login Route

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  // Create the service session and router
  @service session;
  @service router;

  // Before the model is loaded, prohibit authentication from the home page and do redirect
  beforeModel() {
    // Prohibit authentication coming from the home page
    this.session.prohibitAuthentication('home');

    // If the session token is not undefined, redirect to the account page
    if (this.session.data.authenticated.token !== undefined) {
      this.router.transitionTo('account');
    }
  }
}
