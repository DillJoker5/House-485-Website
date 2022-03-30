import Model, { attr } from '@ember-data/model';

export default class RegisterModel extends Model {
  @attr username;
  @attr name;
  @attr email;
  @attr password;
}