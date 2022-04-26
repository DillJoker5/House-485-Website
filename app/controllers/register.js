import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RegisterController extends Controller {
    @service session;

    @tracked error;
    @tracked username;
    @tracked name;
    @tracked password;

    @action
    async register(e) {
        e.preventDefault();
        let response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Username': this.username,
                'Name': this.name,
                'Password': this.password,
                'HouseId': 1
            })
        });

        if (response.ok) {
            return response.json();
        } else {
            let error = await response.text();
            throw new Error(error);
        }
    }

    @action
    update(attribute, e) {
        this[attribute] = e.target.value;
    }
}