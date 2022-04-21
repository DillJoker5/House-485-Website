import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class HomeController extends Controller{
    @action
    refreshModel() {
        this.refresh();
    }
}
