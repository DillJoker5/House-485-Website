import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HouseComponent extends Component {
    @service router;

    get isHomeRoute() {
        const currentRoute = this.router.currentRouteName;
        if (currentRoute == 'home') return true;
        return false;
    }
}