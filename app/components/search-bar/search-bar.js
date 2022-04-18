import Component from '@glimmer/component';

export default class SearchBarComponent extends Component {
    get results() {
        let { houses, searchString } = this.args;
        console.log(houses)

        if(searchString) {
            houses = houses.filter((house) => house.address.includes(searchString)); // change depending on API
        }

        return houses;
    }
}
