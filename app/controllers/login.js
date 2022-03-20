import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service session;

  @tracked error;
  @tracked username;
  @tracked password;

  @action
  async login(e) {
    e.preventDefault();
    try {
      await this.session.authenticate(
        'authenticator:token',
        this.username,
        this.password
      );
    } catch (error) {
      this.error = error;
    }
  }

  @action
  update(attribute, e) {
    this[attribute] = e.target.value;
  }
}
