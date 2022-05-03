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
            let { address, favorite } = this.args;
            favorite = !favorite;
            const favoriteUrl = '/updateFavorite';

            const response = await axios.post(
                favoriteUrl,
                {
                    "Price": 1, // dynamically get this
                    "HouseLocation": address,
                    "Distance": 1,
                    "UserGuid": "cdd6d710-9b59-41b2-8e8a-776bdedfab12", // dynamically get this
                    "UserId": 1, // dynamically get this
                    "Favorite": favorite
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            if (response.status === 200) {
                this.getFavoriteValue();
            }
        } catch(error) {
            throw new Error(error);
        }
    }
}
