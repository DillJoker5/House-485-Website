// Home Template Controller

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller{
    // Create tracked variable for if the home component is loading
    @tracked loadHomeComponent;

    // Create service session
    @service session;

    // Action that checks to see if the route's model is loaded
    @action
    loadHouses() {
        // Grab the current model
        const model = this.get('model');

        // If the model exists then set the tracked variable to true
        if (model && model.housesModel.length > 0) {
            this.loadHomeComponent = true;
        }
        else {
            // Set the tracked variable to false since the model does not exist
            this.loadHomeComponent = false
        }
    }

    // Action that refreshes the route's model
    @action
    refreshHomeModel() {
        // Set the tracked variable to false
        this.loadHomeComponent = false;

        // Send the action refreshModel to the Home Route
        this.send('refreshModel');
    }
}