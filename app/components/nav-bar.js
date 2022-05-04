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
            this.isLoggedIn = true;
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
                    "SessionId": 80002, // dynamically get this
                    "UserId": 4, // dynamically get this
                    "UserGuid": this.session.data.authenticated.token,
                    "IsActive": true,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "UserGuid": this.session.data.authenticated.token,
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