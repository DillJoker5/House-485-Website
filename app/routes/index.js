// Index Route

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
    // Create service session
    @service session;
}
