import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class HomeController extends Controller{
    @action
    modelLoaded() {
        console.log('refresh model')
        let model = this.get('model');
        if (model) {
            return true;
        }
        return false;
    }
}