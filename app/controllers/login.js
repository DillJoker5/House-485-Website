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
      const loginUrl = '/login';

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
      if (response.status === 200) {
        this.session.data.authenticated.token = response.data.UserGuid;
        this.username = '';
        this.password = '';
        this.router.transitionTo('home');
      }
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
