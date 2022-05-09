// Account Template Controller

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import axios from 'axios';

export default class AccountController extends Controller {
    // Create service session and router
    @service session;
    @service router;

    // Logout action where the user clicks the button to logout of their account
    @action
    async logout() {
        // If the session is not authenticated, redirect to login page
        if (this.session.data.authenticated.token === undefined) {
            this.router.transitionTo('login');
            return;
        }
        try {
            // Prepare logout api call
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

            // If response returns an okay status
            if (response.status === 200) {
                // Set authenticated object to an empty object
                this.session.data.authenticated = {};
                
                // Invalidate the session
                this.session.invalidate();

                // Redirect to the home page
                this.router.transitionTo('home');
            }
        } catch(error) {
            // Throw any error caught in the api call
            throw new Error(error);
        }
    }
}
