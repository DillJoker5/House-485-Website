// Home Route

import Route from '@ember/routing/route';
import axios from 'axios';
import { later } from '@ember/runloop';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  // Create service session
  @service session;

  async model() {
    // Real API Request

    // Setup objects for the api request
    const houseResponse = [];
    const data = [];
    const housesModel = [];

    // Setup the first api call to the Realty in US api list-for-sale endpoint
    const options = {
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale',
      params: {
        city: 'Milwaukee',
        state_code: 'WI',
        offset: '0',
        limit: '5',
        sort: 'relevance'
      },
      headers: {
        'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
        'X-RapidAPI-Key': '288b065a66msh365398d4ed7716ep150ff1jsn97f8529b3312'
      }
    };

    // Call the above Realty in US api endpoint
    axios.request(options).then(function (response) {
      // Store the response data
      let responseData = response.data;

      // Push the response data to the houseResponse array
      houseResponse.push(response.data);

      // For each house in the response data call a Realty in US api to grab more detailed information
      for (let i = 0; i < responseData.properties.length; i++) {
        // Save the current property to a variable
        let currentProperty = responseData.properties[i];

        // Setup the second Realty in US api endpoint
        const options = {
          method: 'GET',
          url: 'https://realty-in-us.p.rapidapi.com/properties/v2/detail',
          params: { 
            property_id: currentProperty.property_id 
          },
          headers: {
            'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
            'X-RapidAPI-Key': '288b065a66msh365398d4ed7716ep150ff1jsn97f8529b3312'
          }
        };

        // Create a later block to execute the chunk of code after a certain amount of time
        later(() => {
          // Call the above Realty in US endpoint
          axios.request(options).then(function (response) {
            // Create a description, country, and photos attribute in the current house in the houseResponse array
            houseResponse[0].properties[i]["description"] = response.data.properties[0].description;
            houseResponse[0].properties[i]["address"]["country"] = "United States";
            houseResponse[0].properties[i]["photos"] = response.data.properties[0].photos;
          }).catch(function (error) {
            // Throw a new error if one was found
            throw new Error(error);
          });
        }, 1000)
      }

      // If the houseResponse is fully built out push the entire properties array in the data array
      if (houseResponse[0].properties) {
        // Push the houseResponse properties array to the data array
        data.push(houseResponse[0].properties);
      }
    }).catch(function (error) {
      // Throw a new error if one was found
      throw new Error(error);
    });

    // Grab Favorite Data

    // Create an array to store all of the favorite houses
    let favoriteData = [];

    // Setup the favorite api call
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

    later(() => {
      if(data.length > 0) {
        return data[0].map((model) => {
          let id = model.property_id;
          let attributes = model;
          let location, address, image, price, lat, lng, favorite;
        
          address = attributes.address.line + ', ' + attributes.address.city + ', ' + attributes.address.state_code + ' ' + attributes.address.postal_code;
          location = attributes.address.line + ', ' + attributes.address.city + '(' + attributes.address.county + '), ' + attributes.address.state + '(' + attributes.address.state_code + ') ' + attributes.address.postal_code + ', United States , ' + attributes.address.lat + ' ' + attributes.address.lon;
          if (attributes.photos) {
            image = attributes.photos[0].href;
          }
          price = attributes.price;
          lat = attributes.address.lat;
          lng = attributes.address.lon;

          let favoriteRow = favoriteData.filter((favorite) => favorite.HouseLocation == address);
          if (favoriteRow.length) {
            favorite = true;
          }
          else {
            favorite = false;
          }
        
          housesModel.push({ id, address, location, image, price, lat, lng, favorite, attributes });
        });
      }
    }, 3000);
    
    return { housesModel };

    // Fake Data API Request
    /*let requestOneSuccess = false;
    let requestTwoSuccess = false;

    let response = await fetch('/realtyAPI/houses.json');
    let data = await response.json();
    requestOneSuccess = requestTwoSuccess = true; 

    if (requestOneSuccess && requestTwoSuccess) {
      return data.map((model) => {
        model = model.properties[0]
        let id = model.property_id;
        let attributes = model;
        let location, address, image, price, lat, lng, favorite;

        address = attributes.address.line + ', ' + attributes.address.city + ', ' + attributes.address.state_code + ' ' + attributes.address.postal_code;
        location = attributes.address.line + ', ' + attributes.address.city + '(' + attributes.address.county + '), ' + attributes.address.state + '(' + attributes.address.state_code + ') ' + attributes.address.postal_code + ', ' + attributes.address.country + ', ' + attributes.address.lat + ' ' + attributes.address.lon;
        image = attributes.photos[0].href;
        price = attributes.price;
        lat = attributes.address.lat;
        lng = attributes.address.lon;

        let favoriteRow = favoriteData.filter((favorite) => favorite.HouseLocation == address);
        if (favoriteRow.length) favorite = true;
        else favorite = false;

        return { id, address, location, image, price, lat, lng, favorite, attributes };
      });
    }*/
  }

  // Action that refreshes the route's model
  @action
  refreshModel() {
    // Refresh the route's model
    this.refresh();
  }
}
