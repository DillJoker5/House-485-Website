import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class StarHouseComponent extends Component {
    @tracked favorite;

    get favoriteValue() {
        let { favoriteVal } = this.args;
        this.favorite = favoriteVal;
    }

    get switchValue() {
        this.favorite = !this.favorite;
    }
}
