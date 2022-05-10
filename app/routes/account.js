// Account Route

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  // Create service session and router
  @service session;
  @service router;
}
