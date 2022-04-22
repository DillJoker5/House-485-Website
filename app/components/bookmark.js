import Component from '@glimmer/component';

export default class BookmarkComponent extends Component {
    get isLoading() {
        bookmarkModel = this.get('model');
        if (bookmarkModel != undefined) return true;
        return false;
    }
}