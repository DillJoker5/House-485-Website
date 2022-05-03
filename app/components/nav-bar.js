import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';

export default class NavBarComponent extends Component {
    @service session;
    @service router;

    @action
    logout() {
        const logoutOptions = {
            url: 'http://localhost:8000/logout',
            method: 'POST',
            mode: 'no-cors',
            headesr: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "SessionId": 1,
                "UserId": 1,
                "UserGuid": "",
                "IsActive": true,
            })
        }

        axios.request(logoutOptions)
            .then((response) => {
                // change isAuthenticated to false and get rid of any authentication stuff
            })
            .catch((error) => {
                throw new Error(error);
            });
        this.session.invalidate();
        this.router.transitionTo('home');
    }
}