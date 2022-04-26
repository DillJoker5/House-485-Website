import { computed } from '@ember/object';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
export default class ApplicationAdapter {
    @service session;
    
    @computed('session.data.authenticated.token')
    get headers() {
        let headers = {};
        if (this.sessions.isAuthenticated) {
            headers['token'] = this.session.data.authenticated.token;
        }
        return headers;
    }
}
