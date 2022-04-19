import Component from '@glimmer/component';

export default class SearchBarComponent extends Component {
    get results() {
        let { houses, searchString } = this.args;

        if(searchString) {
            houses = houses.filter((house) => house.address.toLowerCase().includes(searchString.toLowerCase()));
        }

        return houses;
    }
}
