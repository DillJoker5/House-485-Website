// Nav-Bar Component

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class NavBarComponent extends Component {
    // Create service session and router
    @service session;
    @service router;
}