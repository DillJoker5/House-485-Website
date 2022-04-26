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
      let response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Username': this.username,
                'Password': this.password
            })
        });

        if (response.ok) {
            return response.json();
        } else {
            let error = await response.text();
            throw new Error(error);
        }
    } catch (error) {
      this.error = error;
    }
  }

  @action
  update(attribute, e) {
    this[attribute] = e.target.value;
  }
}
