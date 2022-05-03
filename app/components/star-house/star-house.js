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
    changeFavoriteValue() {
        let { address, favorite } = this.args;
        favorite = !favorite;
        const options = {
            method: 'POST',
            mode: 'no-cors',
            url: 'http://localhost:8000/updateFavorite',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "Price": 1,
                "HouseLocation": address,
                "Distance": 1,
                "UserGuid": "cdd6d710-9b59-41b2-8e8a-776bdedfab12",
                "UserId": 1,
                "Favorite": favorite
            }
        }
        axios.request(options)
            .then((response) => {
                if (response.Type === 'Success') {
                    this.getFavoriteValue();
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
}
