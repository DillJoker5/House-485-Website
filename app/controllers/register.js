import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import axios from '../../node_modules/axios/index';

export default class RegisterController extends Controller {
    @service session;
    @service router;

    @tracked error;
    @tracked username;
    @tracked name;
    @tracked password;

    @action
    async register(e) {
        e.preventDefault();
        try {
            const registerOptions = {
                url: 'http://localhost:8000/register',
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Username': this.username,
                    'Name': this.name,
                    'Password': this.password,
                    'HouseId': 1,
                })
            }

            axios.request(registerOptions)
                .then((response) => {
                    if (response.ok) {
                        this.username = '';
                        this.name = '';
                        this.password = '';
                        this.router.transitionTo('login');
                        return;
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } catch(error) {
            this.error = error;
        }
    }

    @action
    update(attribute, e) {
        this[attribute] = e.target.value;
    }
}