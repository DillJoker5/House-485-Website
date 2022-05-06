import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import axios from 'axios';

export default class AccountController extends Controller {
    @service session;
    @service router;

    @action
    async logout() {
        if (this.session.data.authenticated.token === undefined) {
            this.router.transitionTo('login');
            return;
        }
        try {
            const logoutUrl = '/logout';
    
            const response = await axios.post(
                logoutUrl,
                {
                    "UserGuid": this.session.data.authenticated.token[0],
                    "IsActive": true,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "UserGuid": this.session.data.authenticated.token[0],
                    }
                }
            );
            if (response.status === 200) {
                // change isAuthenticated to false and get rid of any authentication stuff
                this.session.data.authenticated = {};
                this.session.invalidate();
                this.router.transitionTo('home');
            }
        } catch(error) {
            throw new Error(error);
        }
    }
}