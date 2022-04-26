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
        try {
            await this.session.register(
                'authenticator:register',
                this.username,
                this.name,
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