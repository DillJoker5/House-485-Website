import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class HomeComponent extends Component {
  @tracked searchString = '';
  @tracked currentPropertyId = '';

  get propertyId() {
    let { propertyIdentification } = this.args;
    this.currentPropertyId = propertyIdentification;
    return this.currentPropertyId;
  }
}
