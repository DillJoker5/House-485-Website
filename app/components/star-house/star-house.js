import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class StarHouseComponent extends Component {
    @tracked favorite = false;
    @tracked houseId;

    get getFavoriteValue() {
        let { id } = this.args;
        this.houseId = id;
    }
}
