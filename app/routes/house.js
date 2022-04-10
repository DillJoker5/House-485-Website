import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import axios from 'axios';
import ENV from '../../config/environment';

const REALTY_API_URL = 'realty-in-us.p.rapidapi.com';
const REALTY_ENDPOINT_1 = '/properties/v2/list-for-sale';
const REALTY_ENDPOINT_2 = 'properties/v2/detail';
const CITY = 'Milwaukee';
const STATECODE = 'WI';
const OFFSET = 0;
const LIMIT = 10;

export default class HouseRoute extends Route {
  /*@service store;
  async model(params) {
    return this.store.findRecord('house', params.property_id);
  }*/

  async model() {
    let requestOneSuccess = false;
    let requestTwoSuccess = false;
    /* Real API Request
    const requestOneOptions = {
      method: 'GET',
      url: REALTY_API_URL + REALTY_ENDPOINT_1,
      params: {
        city: CITY,
        state_code: STATECODE,
        offset: OFFSET,
        limit: LIMIT
      },
      headers: {
        'X-RapidAPI-Host': REALTY_API_URL,
        'X-RapidAPI-Key': ENV.REALTY_TOKEN
      }
    }

    axios.request(requestOneOptions).then((response) => {
      requestOneSuccess = true;
      responseData = await response.json();
      for (let i = 0; i < responseData.properties.length; i++) {
        let currentProperty = responseData.properties[i];
        const requestTwoOptions = {
          method: 'GET',
          url: REALTY_API_URL + REALTY_ENDPOINT_2,
          params: {
            property_id: currentProperty.property_id
          },
          headers: {
            'X-RapidAPI-Host': REALTY_API_URL,
            'X-RapidAPI-Key': ENV.REALTY_TOKEN
          }
        }

        axios.request(requestTwoOptions).then((responseTwo) => {
          requestTwoSuccess = true;
        }).catch((error) => {
          throw new Error(error);
        });
      }
    }).catch((error) => {
      throw new Error(error);
    });*/

    // Fake Data API Request

    let response = await fetch('/realtyAPI/houses.json');
    let { data } = await response.json();
    requestOneSuccess = requestTwoSuccess = true; 

    if (requestOneSuccess && requestTwoSuccess) {
      return data.map((model) => {
        let { id, attributes } = model;
        let location, address;

        address = attributes.address.line + ',' + attributes.address.city + ',' + attributes.address.state_code + attributes.address.postal_code;
        location = attributes.address.line + ',' + attributes.address.city + '(' + attributes.address.county + '),' + attributes.address.state + '(' + attributes.address.state_code + '),' + attributes.address.country + ',' + attributes.address.lat + attributes.address.lon;
        
        return { id, address, location, ...attributes };
      })
    }
  }
}
