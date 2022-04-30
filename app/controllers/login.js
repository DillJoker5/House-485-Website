import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';

export default class LoginController extends Controller {
  @service session;
  @service router;

  @tracked error;
  @tracked username;
  @tracked password;

  @action
  async login(e) {
    e.preventDefault();
    try {
      const loginBody = {
        "Username": this.username,
        "Password": this.password
      };
      const loginOptions = {
        url: 'http://localhost:8000/login',
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginBody)
      }
      console.log(loginOptions.body)

      axios.request(loginOptions)
        .then((response) => {
          if (response.ok) {
          // put userguid in here
          this.username = '';
          this.password = '';
          this.router.transitionTo('home');
          return;
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      this.error = error;
      throw new Error(error);
    }
  }

  @action
  update(attribute, e) {
    this[attribute] = e.target.value;
  }
}
