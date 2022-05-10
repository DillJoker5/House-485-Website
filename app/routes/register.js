// Register Route

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RegisterRoute extends Route {
  // Create service session
  @service session;

  // Before this model is loaded, prohibit authentication coming from the home page
  beforeModel() {
    this.session.prohibitAuthentication('home');
  }
}
