import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegisterComponent extends Component {
    @service router;
    @tracked username = '';
    @tracked password = '';

    @action isDisabled() {}
}