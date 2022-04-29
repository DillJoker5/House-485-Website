import Route from '@ember/routing/route';
import axios from 'axios';
import { later } from '@ember/runloop';

export default class HomeRoute extends Route {

  async model() {
    let requestOneSuccess = false;
    let requestTwoSuccess = false;
    /*const houseResponse = [];
    const data = [];
    const housesModel = [];
    // Real API Request

    const options = {
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale',
      params: {
        city: 'Milwaukee',
        state_code: 'WI',
        offset: '0',
        limit: '1',
        sort: 'relevance'
      },
      headers: {
        'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
        'X-RapidAPI-Key': '9c8fec7b21msh2f2533962063080p19896djsn3ffdd1daeb7d'
      }
    };

    axios.request(options).then(function (response) {
      let responseData = response.data;
      houseResponse.push(response.data);
      for (let i = 0; i < responseData.properties.length; i++) {
        let currentProperty = responseData.properties[i];
        const options = {
          method: 'GET',
          url: 'https://realty-in-us.p.rapidapi.com/properties/v2/detail',
          params: { 
            property_id: currentProperty.property_id 
          },
          headers: {
            'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
            'X-RapidAPI-Key': '9c8fec7b21msh2f2533962063080p19896djsn3ffdd1daeb7d'
          }
        };

        axios.request(options).then(function (response) {
          houseResponse[0].properties[i]["description"] = response.data.properties[0].description;
          houseResponse[0].properties[i]["address"]["country"] = "United States";
          houseResponse[0].properties[i]["photos"] = response.data.properties[0].photos;
        }).catch(function (error) {
          throw new Error(error);
        });
        setTimeout(() => {}, 1000);
      }
      if (houseResponse[0].properties) {
        data.push(houseResponse[0].properties);
      }
    }).catch(function (error) {
      throw new Error(error);
    });*/

    // Grab Favorite Data
    let favoriteData = [];
    const favoriteOptions = {
      method: 'POST',
      mode: 'no-cors',
      url: 'http://localhost:8000/home',
      headers : {
        'Content-Type': 'application/json',
      },
    }

    axios.request(favoriteOptions)
      .then((response) => {
        for(let i = 0; i < response.data.length; i++) {
          favoriteData.push(response.data[i])
        }
      })
      .catch((error) => {
        throw new Error(error);
      });

    /*
    later(() => {
      return data.map((model) => {
        let id = model[0].property_id;
        let attributes = model[0];
        let location, address, image, price, lat, lng, favorite;
      
        address = attributes.address.line + ', ' + attributes.address.city + ', ' + attributes.address.state_code + ' ' + attributes.address.postal_code;
        location = attributes.address.line + ', ' + attributes.address.city + '(' + attributes.address.county + '), ' + attributes.address.state + '(' + attributes.address.state_code + ') ' + attributes.address.postal_code + ', ' + attributes.address.country + ', ' + attributes.address.lat + ' ' + attributes.address.lon;
        if (attributes.photos) {
          image = attributes.photos[0].href;
        }
        price = attributes.price;
        lat = attributes.address.lat;
        lng = attributes.address.lon;
        favorite = false;
      
        housesModel.push({ id, address, location, image, price, lat, lng, favorite, attributes });
      });
    }, 5000);
    return { housesModel };
    */

    // Fake Data API Request

    let response = await fetch('/realtyAPI/houses.json');
    let data = await response.json();
    requestOneSuccess = requestTwoSuccess = true; 

    if (requestOneSuccess && requestTwoSuccess) {
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

        let favoriteRow = favoriteData.filter((favorite) => favorite.HouseLocation == address);
        if (favoriteRow) favorite = true;
        else favorite = false;
        sold = false;

        return { id, address, location, image, price, lat, lng, favorite, attributes };
      });
    }
  }
}
