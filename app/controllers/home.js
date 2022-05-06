import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller{
    @tracked loadHomeComponent;
    @service session;

    @action
    loadHouses() {
        const model = this.get('model');
        if (model && model.housesModel.length > 0) {
            this.loadHomeComponent = true;
        }
        else {
            this.loadHomeComponent = false
        }
    }

    @action
    refreshHomeModel() {
        this.loadHomeComponent = false;
        this.send('refreshModel');
    }
}