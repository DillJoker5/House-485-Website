import Model, { attr } from '@ember-data/model';
import HousingMockData from '@realtyAPI/houses.json'
export default class HouseModel extends Model {
  @attr price;
  @attr address;
  @attr location;
  @attr image;
  @attr description;
  @attr url;
  @attr id;
  @attr favorite;
}