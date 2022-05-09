// Bookmark Route

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import axios from 'axios';
import { action } from '@ember/object';

export default class BookmarkRoute extends Route {
    // Create service session and router
    @service session;
    @service router;

    // Before the model is created check if the session is authenticated
    beforeModel() {
        // If the session's token is undefined redirect the user to the login page
        if (this.session.data.authenticated.token === undefined) {
            // Redirect the user to the login page
            this.router.transitionTo('login');
        }
    }
    async model() {
        try {
            // Create an array for the bookmark data
            let bookmarkData = [];

            // Setup the bookmark api endpoint
            const bookmarkUrl = '/favorite';

            // Send the POST request to the bookmark api endpoint
            const response = await axios.post(
                bookmarkUrl,
                {
                    "UserId": this.session.data.authenticated.token[1],
                    "UserGuid": this.session.data.authenticated.token[0],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "UserGuid": this.session.data.authenticated.token[0],
                    }
                }
            );

            // If the response's status is an okay status, push all of the response's data to the bookmark array
            if (response.status === 200) {
                // For every bookmark in the response's data
                for(let i = 0; i < response.data.Data.length; i++) {
                    // Push the current bookmark to the bookmark data array
                    bookmarkData.push(response.data.Data[i]);
                }
            }

            // Create a variable for the current user id and create an array for the route model's data
            let userId = this.session.data.authenticated.token[1];
            let data = [];

            // Create a for loop to loop over every bookmark in the bookmark data array
            for(let i = 0; i < bookmarkData.length; i++) {
                // Create a variable for the bookmark's user id
                let bookmarkUserId = bookmarkData[i].UserId;

                // if this user id matches any id in bookmarkResponse, push the current bookmark to the data array
                if (userId == bookmarkUserId) {
                    // Push the current bookmark into the data array
                    data.push(bookmarkData[i]);
                } else continue; // If the bookmark's user id is not the current user id then continue
            }

            // Setup the return block for the route's model
            return data.map((model) => {
                // Setup variables for the attributes, id, price, distance, address, and favorite variables
                let attributes = model;
                let id = model.HouseId;
                let price, distance, address, favorite;

                // Assign the price, distance, address, and favorite variables with the data in the model variable
                price = model.Price;
                distance = model.Distance;
                address = model.HouseLocation;
                favorite = true;

                // Push all of the variables to route's model
                return { id, price, distance, address, favorite, attributes };
            });

        } catch(err) {} // Catch block for if any errors are returned
    }

    // Action that refreshes the route's model
    @action
    refreshModel() {
        // Refresh the route's model
        this.refresh();
    }
}