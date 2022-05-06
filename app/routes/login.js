import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service session;
  @service router;

  beforeModel() {
    this.session.prohibitAuthentication('home');
    if (this.session.data.authenticated.token !== undefined) {
      this.router.transitionTo('account');
    }
  }
}
