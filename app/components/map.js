import Component from '@glimmer/component';
import ENV from 'house-485-website/config/environment';

const MAPBOX_API_URL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

export default class MapComponent extends Component {
    get src() {
        let { lng, lat, width, height, zoom } = this.args;

        let cords = `${lng},${lat},${zoom}`;
        let dim = `${width}x${height}`;
        let token = `access_token=${this.token}`;

        return `${MAPBOX_API_URL}/${cords}/${dim}@2x?${token}`;
    }

    get token() {
        return encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);
    }
}
