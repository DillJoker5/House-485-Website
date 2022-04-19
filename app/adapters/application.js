import { computed } from '@ember/object';

export default class ApplicationAdapter {

    @computed('session.data.authenticated.token')
    get headers() {
        let headers = {};
        if (this.sessions.isAuthenticated) {
            headers['token'] = this.session.data.authenticated.token;
        }
        return headers;
    }
}
