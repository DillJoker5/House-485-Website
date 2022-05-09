// Search Bar Component

import Component from '@glimmer/component';

export default class SearchBarComponent extends Component {
    // Getter to grab the results against the current search string
    get results() {
        let { houses, searchString } = this.args;

        // If the search string exists, filter the houses array by the search string
        if(searchString) {
            houses = houses.filter((house) => house.address.toLowerCase().includes(searchString.toLowerCase()));
        }

        return houses;
    }
}
