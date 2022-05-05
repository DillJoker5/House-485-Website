import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import axios from 'axios';
import { action } from '@ember/object';

export default class BookmarkRoute extends Route {
    @service session;
    @service router;

    beforeModel() {
        if (this.session.data.authenticated.token === undefined) {
            this.router.transitionTo('login');
        }
    }
    async model() {
        try {
            let bookmarkData = [];
            const bookmarkUrl = '/favorite';

            const response = await axios.post(
                bookmarkUrl,
                {
                    "UserId": this.session.data.authenticated.token[1],
                    "UserGuid": this.session.data.authenticated.token[0],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "UserGuid": this.session.data.authenticated.token[0],
                    }
                }
            );
            if (response.status === 200) {
                for(let i = 0; i < response.data.Data.length; i++) {
                    bookmarkData.push(response.data.Data[i]);
                }
            }

            // if this user id matches any id in bookmarkResponse
            let userId = this.session.data.authenticated.token[1];
            let data = [];

            for(let i = 0; i < bookmarkData.length; i++) {
                let bookmarkUserId = bookmarkData[i].UserId;
                if (userId == bookmarkUserId) {
                    data.push(bookmarkData[i]);
                } else continue;
            }

            return data.map((model) => {
                let attributes = model;
                let id = model.HouseId;
                let price, distance, address, favorite;

                price = model.Price;
                distance = model.Distance;
                address = model.HouseLocation;
                favorite = true;

                return { id, price, distance, address, favorite, attributes };
            });

        } catch(err) {}
    }

    @action
    refreshModel() {
        this.refresh();
    }
}