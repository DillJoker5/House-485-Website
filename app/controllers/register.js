import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';

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
            const registerUrl = '/register';
            
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
            if (response.status === 200) {
                this.username = '';
                this.name = '';
                this.password = '';
                this.router.transitionTo('login');
                return;
            }
        } catch(error) {
            this.error = error;
        }
    }

    @action
    update(attribute, e) {
        this[attribute] = e.target.value;
    }
}