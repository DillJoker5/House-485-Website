// Login Template Controller

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';

export default class LoginController extends Controller {
  // Create service session and router
  @service session;
  @service router;

  // Create tracked variables for error, username, and password
  @tracked error;
  @tracked username;
  @tracked password;

  // Action that calls the login api endpoint to login the user and create an active session
  @action
  async login(e) {
    // Prevent the default event from occurring
    e.preventDefault();
    try {
      // Setup the login api call
      const loginUrl = '/login';

      // Call the Login api endpoint
      const response = await axios.post(
        loginUrl,
        {
          "Username": this.username,
          "Password": this.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // If the response returned with the okay status
      if (response.status === 200) {
        // Create the session token with the response's UserGuid and the UserId
        this.session.data.authenticated.token = [ response.data.UserGuid, response.data.UserId ];
        
        // Set both username and password to an empty string
        this.username = '';
        this.password = '';

        // Automatically direct the user back to the home page
        this.router.transitionTo('home');
      }
    } catch (error) {
      // Assign error to its respective tracked value
      this.error = error;

      // Throw the caught error
      throw new Error(error);
    }
  }

  // Action that automatically updates each tracked variable
  @action
  update(attribute, e) {
    // Set the current value of the attribute to the event's target value
    this[attribute] = e.target.value;
  }
}
