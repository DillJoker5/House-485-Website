import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import axios from 'axios';

export default class NavBarComponent extends Component {
    @service session;
    @service router;
    @tracked isLoggedIn;

    @action
    checkSessionToken() {
        if (this.session.data.authenticated.token !== undefined) {
            if (this.session.data.authenticated.token.length === 2) {
                this.isLoggedIn = true;
            }
        } else {
            this.isLoggedIn = false;
        }
    }

    @action
    async logout() {
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
                this.isLoggedIn = false;
                this.router.transitionTo('home');
            }
        } catch(error) {
            throw new Error(error);
        }
    }
}