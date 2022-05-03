import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';

export default class NavBarComponent extends Component {
    @service session;
    @service router;

    get checkSessionToken() {
        console.log(this.session)
        if (this.session.data.authenticated.token) {
            console.log('returning true')
            return true;
        }
        return false;
    }

    @action
    async logout() {
        try {
            const logoutUrl = '/logout';
    
            const response = await axios.post(
                logoutUrl,
                {
                    "SessionId": 1, // dynamically get this
                    "UserId": 1, // dynamically get this
                    "UserGuid": "", // dynamically get this
                    "IsActive": true,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                // change isAuthenticated to false and get rid of any authentication stuff
                this.session.data.authenticated.token = '';
                this.session.invalidate();
                this.router.transitionTo('home');
            }
        } catch(error) {
            throw new Error(error);
        }
    }
}