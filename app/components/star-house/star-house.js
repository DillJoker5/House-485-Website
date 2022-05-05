import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';

export default class StarHouseComponent extends Component {
    @service session;

    get favorite() {
        return this.args.favorite;
    }

    @action
    async changeFavoriteValue() {
        try {
            let { address, favorite, price } = this.args;
            favorite = !favorite;
            const favoriteUrl = '/updateFavorite';

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
            )
            if (response.status !== 200) {}
        } catch(error) {
            throw new Error(error);
        }
    }
}
