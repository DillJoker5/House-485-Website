// House Image Component

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HouseImageComponent extends Component {
    // Create tracked variable to check what the current view of the image
    @tracked isInOpenView = false;

    // Action to toggle open vuew
    @action toggleOpenView() {
        this.isInOpenView = !this.isInOpenView;
    }
}
