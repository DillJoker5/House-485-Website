// Bookmark Template Controller

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
    // Create tracked variables for an error and if the route is currently loading its model
    @tracked loadBookmarkComponent;
    @tracked error;

    // Action that checks if the route's model is loaded or if an error was thrown in the process of loading it
    @action
    loadHouses() {
        // Grab the model from the route
        const model = this.get('model');

        // If the route's model exist
        if (model && model.length > 0) {
            // Set the tracked error to nothing and set the tracked load state to true
            this.error = '';
            this.loadBookmarkComponent = true;
        }
        else {
            // Set the tracked error to the below string and set the tracked load state to false
            this.error = 'No bookmarks attached to your account.';
            this.loadBookmarkComponent = false
        }
    }

    // Action that refreshes the route's model
    @action
    refreshBookmarkModel() {
        // Set the tracked loading state to false
        this.loadBookmarkComponent = false;

        // Send the action to the route
        this.send('refreshModel');
    }
}
