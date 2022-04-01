import Component from '@glimmer/component';
import ENV from '../../config/environment';

const REALTY_API_URL = 'realty-in-us.p.rapidapi.com';

const REALTY_ENDPOINT_1 = '/properties/v2/list-for-sale';

const REALTY_ENDPOINT_2 = 'properties/v2/detail';

export default class HouseComponent extends Component {
    get address() {
        let { city, country, state_code, postal_code } = this.args;

        return `${line} ${city} ${state_code}, ${country}, ${postal_code}`;
    }

    get location() {
        let {
            line,
            city,
            country,
            state_code,
            postal_code,
            county,
            state
        } = this.args;

        return `${line} ${city}(${county}) ${state}(${state_code}), ${country}, ${postal_code}`;
    }

    get token() {
        return encodeURIComponent(ENV.REALTY_TOKEN);
    }
}