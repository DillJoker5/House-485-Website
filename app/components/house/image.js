import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HouseImageComponent extends Component {
    @tracked isInOpenView = false;

    @action toggleOpenView() {
        this.isInOpenView = !this.isInOpenView;
    }
}
