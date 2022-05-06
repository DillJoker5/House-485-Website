// House Component

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HouseComponent extends Component {
    // Create service router
    @service router;

    // Getter to check if the current route is the home route
    get isHomeRoute() {
        const currentRoute = this.router.currentRouteName;
        if (currentRoute == 'home') return true;
        return false;
    }
}
