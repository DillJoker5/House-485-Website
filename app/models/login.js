import Model, { attr } from '@ember-data/model';

export default class LoginModel extends Model {
    @attr username;
    @attr password;
}