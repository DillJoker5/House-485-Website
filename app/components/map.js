// Map Component

import Component from '@glimmer/component';
import ENV from 'house-485-website/config/environment';

// Global mapbox api url
const MAPBOX_API_URL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

export default class MapComponent extends Component {
    // Getter to grab the correct mapbox api url
    get src() {
        let { lng, lat, width, height, zoom } = this.args;

        let cords = `${lng},${lat},${zoom}`;
        let dim = `${width}x${height}`;
        let token = `access_token=${this.token}`;

        return `${MAPBOX_API_URL}/${cords}/${dim}@2x?${token}`;
    }

    // Getter to grab the access token for the mapbox api
    get token() {
        return encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);
    }
}
