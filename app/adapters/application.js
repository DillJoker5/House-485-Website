// Application adapter

import { inject as service } from '@ember/service';

export default class ApplicationAdapter {
    // Create service session
    @service session;
}
