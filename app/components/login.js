import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegisterComponent extends Component {
    @service router;
    @tracked username = this.username;
    @tracked password = this.password;

    get isDisabled() {
        if(username === '' || password === '') {
            return "true"
            console.log('true')
        }
        console.log('null')
        return null;
    }
}