import { computed } from '@ember/object';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
export default class ApplicationAdapter {
    @service session;
}
