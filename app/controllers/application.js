// Application Template Controller

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
    // Create service session
    @service session;

    // Action that calls the invalidate session function
    @action
    invalidateSession() {
        // Invalidate the current session
        this.session.invalidate();
    }
}
