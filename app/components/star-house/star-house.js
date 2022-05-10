// Star House Component

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';

export default class StarHouseComponent extends Component {
    // Create service session
    @service session;

    // Getter to grab the current favorite value
    get favorite() {
        return this.args.favorite;
    }

    // Action to change the house's current favorite value
    @action
    async changeFavoriteValue() {
        try {
            let { address, favorite, price } = this.args;

            // Set favorite value to its opposite
            favorite = !favorite;

            const favoriteUrl = '/updateFavorite';

            // Create a request to the updateFavorite api endpoint
            const response = await axios.post(
                favoriteUrl,
                {
                    "Price": price,
                    "HouseLocation": address,
                    "Distance": Math.random()*499,
                    "UserGuid": this.session.data.authenticated.token[0],
                    "UserId": this.session.data.authenticated.token[1],
                    "Favorite": favorite
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "UserGuid": this.session.data.authenticated.token[0],
                    }
                }
            );

            // If the response is 200 then do nothing
            if (response.status !== 200) {}

        } catch(error) {
            // If error is returned, throw the error
            throw new Error(error);
        }
    }
}
