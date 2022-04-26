import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default class BookmarkRoute extends Route {
    @service session;

    beforeModel(transition) {
        //this.session.requireAuthentication(transition, 'login')
    }
    async model() {
        /*let bookmarkResponse = await fetch('http://localhost:8000/home', {
            method: 'POST',
            mode: 'no-cors',
        });
        print(bookmarkResponse);*/
        let bookmarkResponse = await fetch('/realtyAPI/houses.json')
        //let bookmarkData = await bookmarkResponse.json();

        // grab house data from api
        let homeModel = this.modelFor('home');
        let data = await bookmarkResponse.json();

        // if this user id matches any id in bookmarkResponse
        /*let houseId = '';
        let data = [];

        for(let i = 0; i < bookmarkData.length; i++) {
            userId = bookmarkData[i].HouseId;
            if (houseId == homeModel[i].property_id) {
                data.push(homeModel[i]);
            } else continue;
        }

        return data.map((model) => {
            let id = model.property_id;
            let attributes = model;
            let location, address, image, price, lat, lng, favorite;

            address = attributes.address.line + ', ' + attributes.address.city + ', ' + attributes.address.state_code + ' ' + attributes.address.postal_code;
            location = attributes.address.line + ', ' + attributes.address.city + '(' + attributes.address.county + '), ' + attributes.address.state + '(' + attributes.address.state_code + ') ' + attributes.address.postal_code + ', ' + attributes.address.country + ', ' + attributes.address.lat + ' ' + attributes.address.lon;
            image = attributes.photos[0].href;
            price = attributes.price;
            lat = attributes.address.lat;
            lng = attributes.address.lon;
            favorite = true;

            return { id, address, location, image, price, lat, lng, favorite, attributes };
        });*/
        return data.map((model) => {
            model = model.properties[0]
            let id = model.property_id;
            let attributes = model;
            let location, address, image, price, lat, lng, favorite, sold;
    
            address = attributes.address.line + ', ' + attributes.address.city + ', ' + attributes.address.state_code + ' ' + attributes.address.postal_code;
            location = attributes.address.line + ', ' + attributes.address.city + '(' + attributes.address.county + '), ' + attributes.address.state + '(' + attributes.address.state_code + ') ' + attributes.address.postal_code + ', ' + attributes.address.country + ', ' + attributes.address.lat + ' ' + attributes.address.lon;
            image = attributes.photos[0].href;
            price = attributes.price;
            lat = attributes.address.lat;
            lng = attributes.address.lon;
            favorite = true;

            let soldRow = homeModel.filter((home) => home.property_id == id)
            if (soldRow) sold = true;
            else sold = false;
    
            return { id, address, location, image, price, lat, lng, favorite, sold, attributes };
          });
    }
}