import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class HomeComponent extends Component {
  @tracked searchString = '';
}
