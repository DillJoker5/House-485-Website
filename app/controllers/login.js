import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import axios from '../../node_modules/axios/index';

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
      const loginOptions = {
        url: 'http://localhost:8000/login',
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'Username': this.username,
          'Password': this.password
        })
      }

      axios.request(loginOptions)
        .then((response) => {
          if (response.ok) {
          // put userguid in here
          }
        })
        .catch((error) => {
          throw new Error(error);
        });

      this.username = '';
      this.password = '';
      this.router.transitionTo('home');
      return;
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
