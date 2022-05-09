# House-485-Website
Capstone Project Frontend. Project provides a Ember.JS SPA with various information about the Milwaukee Housing Market.

## Description
This repository holds all of the frontend logic, HTML, CSS (styling), components, and everything on the frontend for the [House-485-Website](https://github.com/DillJoker5/House-485-Website).

## Installation
You will need the following things properly installed and working on your device before running this project.
* Please note that you will need to install and run both the [House-485-Backend](https://github.com/DillJoker5/House-485-Backend) and [House-485-Database](https://github.com/DillJoker5/House-485-Database) to fully use this frontend project. Please see those installation guides for how to install them.
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Running
* Create a folder where you will store this project
* Clone the repository in the newly created folder
* Run the [House-485-Database](https://github.com/DillJoker5/House-485-Database) and the [House-485-Backend](https://github.com/DillJoker5/House-485-Backend). See [here](https://github.com/DillJoker5/House-485-Database) for help running the database and see [here](https://github.com/DillJoker5/House-485-Backend) for help running the backend project.
* Open a new terminal in the directory of the repository
* Before running the repository, please run the following npm command: npm install
* In the same terminal, run the following command to start the website: ember serve(or s). Build and Run commands are shown below.
* Optional: To run the tests, run the following command in a terminal in the repository directory: ember t or ember t -s. Testing commands are shown below.

### Installation Commands
* `git clone <repository-url>` this repository
* `cd house-485-website`
* `npm install`

### Run Commands
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Test Commands
* `ember test`
* `ember test --server`

### Build Commands
* `ember build` (develop)
* `ember build --environment testing` (testing)
* `ember build --environment production` (production)

## Code Examples

### All routes

    Router.map(function () {
      this.route('about');
      this.route('account');
      this.route('contact');
      this.route('house');
      this.route('login');
      this.route('logout');
      this.route('register');
      this.route('review');
      this.route('bookmark', { path: '/bookmark' });
      this.route('home', { path: '/' });
      this.route('house', { path: '/:property_id' });
    });

### Model for the Home Page

    async model() {
      // Real API Request
      const houseResponse = [];
      const data = [];
      const housesModel = [];

      const options = {
        method: 'GET',
        url: 'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale',
        params: {
          city: 'Milwaukee',
          state_code: 'WI',
          offset: '0',
          limit: '5',
          sort: 'relevance'
        },
        headers: {
          'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
          'X-RapidAPI-Key': '288b065a66msh365398d4ed7716ep150ff1jsn97f8529b3312'
        }
      };

      axios.request(options).then(function (response) {
        let responseData = response.data;
        houseResponse.push(response.data);

        for (let i = 0; i < responseData.properties.length; i++) {
          let currentProperty = responseData.properties[i];
          const options = {
            method: 'GET',
            url: 'https://realty-in-us.p.rapidapi.com/properties/v2/detail',
            params: { 
              property_id: currentProperty.property_id 
            },
            headers: {
              'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
              'X-RapidAPI-Key': '288b065a66msh365398d4ed7716ep150ff1jsn97f8529b3312'
            }
          };

          later(() => {
            axios.request(options).then(function (response) {
              houseResponse[0].properties[i]["description"] = response.data.properties[0].description;
              houseResponse[0].properties[i]["address"]["country"] = "United States";
              houseResponse[0].properties[i]["photos"] = response.data.properties[0].photos;
            }).catch(function (error) {
              throw new Error(error);
            });
          }, 1000)
        }

        if (houseResponse[0].properties) {
          data.push(houseResponse[0].properties);
        }
      }).catch(function (error) {
        throw new Error(error);
      });

      // Grab favorite data from House table
      let favoriteData = [];

      const favoriteOptions = {
        method: 'POST',
        mode: 'no-cors',
        url: 'http://localhost:8000/home',
        headers : {
          'Content-Type': 'application/json',
        },
      }

      axios.request(favoriteOptions)
        .then((response) => {
          for(let i = 0; i < response.data.length; i++) {
            favoriteData.push(response.data[i])
          }
        })
        .catch((error) => {
          throw new Error(error);
        });

      later(() => {
        if(data.length > 0) {
          return data[0].map((model) => {
            let id = model.property_id;
            let attributes = model;
            let location, address, image, price, lat, lng, favorite;
          
            address = attributes.address.line + ', ' + attributes.address.city + ', ' + attributes.address.state_code + ' ' + attributes.address.postal_code;
            location = attributes.address.line + ', ' + attributes.address.city + '(' + attributes.address.county + '), ' + attributes.address.state + '(' + attributes.address.state_code + ') ' + attributes.address.postal_code + ', United States , ' + attributes.address.lat + ' ' + attributes.address.lon;
            if (attributes.photos) {
              image = attributes.photos[0].href;
            }
            price = attributes.price;
            lat = attributes.address.lat;
            lng = attributes.address.lon;

            let favoriteRow = favoriteData.filter((favorite) => favorite.HouseLocation == address);
            if (favoriteRow.length) {
              favorite = true;
            }
            else {
              favorite = false;
            }
          
            housesModel.push({ id, address, location, image, price, lat, lng, favorite, attributes });
          });
        }
      }, 3000);
      return { housesModel };

      // Fake Data API Request
      /*let requestOneSuccess = false;
      let requestTwoSuccess = false;
      let response = await fetch('/realtyAPI/houses.json');
      let data = await response.json();
      requestOneSuccess = requestTwoSuccess = true; 

      if (requestOneSuccess && requestTwoSuccess) {
        return data.map((model) => {
          model = model.properties[0]
          let id = model.property_id;
          let attributes = model;
          let location, address, image, price, lat, lng, favorite;

          address = attributes.address.line + ', ' + attributes.address.city + ', ' + attributes.address.state_code + ' ' + attributes.address.postal_code;
          location = attributes.address.line + ', ' + attributes.address.city + '(' + attributes.address.county + '), ' + attributes.address.state + '(' + attributes.address.state_code + ') ' + attributes.address.postal_code + ', ' + attributes.address.country + ', ' + attributes.address.lat + ' ' + attributes.address.lon;
          image = attributes.photos[0].href;
          price = attributes.price;
          lat = attributes.address.lat;
          lng = attributes.address.lon;

          let favoriteRow = favoriteData.filter((favorite) => favorite.HouseLocation == address);
          if (favoriteRow.length) favorite = true;
          else favorite = false;

          return { id, address, location, image, price, lat, lng, favorite, attributes };
        });
      }*/
    }

### Bookmark Template

    <App>
      <h1>Welcome to your bookmarks page!</h1>
      <h3>**Note: Houses on this page may or may not already be sold**</h3>
      <br>
      <hr>
      <div class="houses">
          <label>
              <span>See all of your bookmarked houses below!</span>
              <Input @value={{this.searchString}} class="light" />
          </label>
          {{#if this.loadBookmarkComponent}}
              <label>
                  <input type="button" value="Click here to refresh" {{on "click" this.refreshBookmarkModel}} />
              </label>
          {{else}}
              <label>
                  <input type="button" value="Click here to look for houses!" {{on "click" this.loadHouses}} />
              </label>
          {{/if}}

          {{#if this.loadBookmarkComponent}}
              <SearchBar::SearchBar @houses={{@model}} @searchString={{this.searchString}} as |results|>
                  {{#if results}}
                      {{#each results as |home|}}
                          <article class="house">
                              <div class="details">
                                  <div class="details address">
                                      <li>
                                          <span>{{home.address}}</span>
                                      </li>
                                  </div>
                                  <div class="details price">
                                      <li>
                                          <span>
                                              Price : ${{home.price}}
                                          </span>
                                      </li>
                                  </div>
                                  <div class="details distance">
                                      <li>
                                          <span>
                                              Distance: {{home.distance}}
                                          </span>
                                      </li>
                                  </div>
                                  <div>
                                      <h3>Bookmark: <StarHouse::StarHouse @address={{home.address}} @favorite={{home.favorite}} @price={{home.price}}/></h3>
                                  </div>
                              </div>
                          </article>
                      {{/each}}
                  {{/if}}
              </SearchBar::SearchBar>
          {{else}}
              {{#if this.error}}
                  <p class="error"><strong>{{this.error}}</strong></p>
              {{else}}
                  <div class="loader"></div>
              {{/if}}
          {{/if}}
      </div>
  </App>


### Acceptance Test for navigating with the Nav-Bar

    test('navigating using the nav-bar', async (assert) => {
      await visit('/');

      assert.dom('nav').exists();
      assert.dom('nav a.menu-index').hasText('Home');
      assert.dom('nav a.menu-about').hasText('About Us');
      assert.dom('nav a.menu-contact').hasText('Contact Us');
      assert.dom('nav a.menu-account').hasText('Account');
      assert.dom('nav a.menu-bookmark').hasText('Bookmarks');

      await click('nav a.menu-about');
      assert.equal(currentURL(), '/about');

      await click('nav a.menu-contact');
      assert.equal(currentURL(), '/contact');

      await click('nav a.menu-account');
      assert.equal(currentURL(), '/account');

      await click('nav a.menu-index');
      assert.equal(currentURL(), '/');
    });

### Integration Test for a valid Register Process

    test('valid regristration', async function (assert) {
      await visit('register')

      let inputElements = document.querySelectorAll('input');

      inputElements[19].value = 'usernameTest';
      inputElements[20].value = 'nameTest';
      inputElements[21].value = 'passwordTest';

      let formElement = document.querySelectorAll('form');

      assert.equal(formElement.length, 3);

      await click('.register input.button');
      assert.equal(currentURL(), '/login')
    });

## Further Reading / Useful Links for Ember.JS
* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
