import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const REALTY_API_URL = 'realty-in-us.p.rapidapi.com';
const REALTY_ENDPOINT_1 = '/properties/v2/list-for-sale';
const REALTY_ENDPOINT_2 = 'properties/v2/detail';
const CITY = 'Milwaukee';
const STATECODE = 'WI';
const OFFSET = 0;
const LIMIT = 10;

export default class HomeComponent extends Component {
  @tracked searchString = '';
  @tracked currentPropertyId = '';

  get propertyId() {
    let { propertyIdentification } = this.args;
    this.currentPropertyId = propertyIdentification;
    return this.currentPropertyId;
  }
}
