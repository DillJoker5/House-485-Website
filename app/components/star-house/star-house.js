import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import axios from 'axios';

export default class StarHouseComponent extends Component {
    @tracked address;
    @tracked favorite;
    @service session;

    get getFavoriteValue() {
        let { addr, fav } = this.args;
        this.address = addr;
        this.favorite = fav;
    }

    @action
    changeFavoriteValue() {
        this.favorite = !this.favorite;
        const options = {
            method: 'POST',
            mode: 'no-cors',
            url: 'http://localhost:8000/home',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                "Price": 1,
                "HouseLocation": this.address,
                "Distance": 1,
                "UserGuid": "",
                "UserId": 1,
                "Favorite": this.favorite
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
