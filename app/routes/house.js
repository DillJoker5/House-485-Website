import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HouseRoute extends Route {
  /*@service store;
  async model() {
    return this.store.findAll('house');
  }*/
  async model() {
    let response = await fetch('@/realtyApi/houses.json');
    let parsedResponse = await response.json();
    console.log(parsedResponse);
    return parsedResponse;
  }
}
