import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegisterComponent extends Component {
    @service router;
    @tracked username = this.get('login.username');
    @tracked password = this.get('login.password');

    get isDisabled() {
        if(this.username === '' || this.password === '') {
            return "true"
            console.log('true')
        }
        console.log('null')
        return null;
    }
}