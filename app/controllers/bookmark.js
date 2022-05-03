import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller{
    @tracked loadBookmarkComponent;

    @action
    loadHouses() {
        const model = this.get('model');
        if (model && model.length > 0) {
        this.loadBookmarkComponent = true;
        }
        else {
        this.loadBookmarkComponent = false
        }
    }

    @action
    refreshBookmarkModel() {
        this.loadBookmarkComponent = false;
        this.send('refreshModel');
    }
}