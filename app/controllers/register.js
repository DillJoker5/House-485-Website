// Register Template Controller

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';

export default class RegisterController extends Controller {
    // Create service session and router
    @service session;
    @service router;

    // Create tracked variables for error, username, name, and password
    @tracked error;
    @tracked username;
    @tracked name;
    @tracked password;

    // Action that calls the register api endpoint to create a user in the Users table for the current user
    @action
    async register(e) {
        // Prevent the default event from occurring
        e.preventDefault();
        try {
            // Setup the register api call
            const registerUrl = '/register';
            
            // Call the Register api endpoint
            const response = await axios.post(
                registerUrl,
                {
                    "Username": this.username,
                    "Name": this.name,
                    "Password": this.password,
                    "HouseId": 1,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            // If the response returned with the okay status
            if (response.status === 200) {
                // Set the username, name, and password to an empty string
                this.username = '';
                this.name = '';
                this.password = '';

                // Automatically direct the user to the login page to login with their new account
                this.router.transitionTo('login');
                return;
            }
        } catch(error) {
            // Assign error to its respective tracked value
            this.error = error;
        }
    }

    // Action that automatically updated each tracked variable
    @action
    update(attribute, e) {
        // Set the current value of the attribute to the event's target value
        this[attribute] = e.target.value;
    }
}
