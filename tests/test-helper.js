// Ember Test Helper

import Application from 'house-485-website/app';
import config from 'house-485-website/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

// Setup the test application
setApplication(Application.create(config.APP));

// Setup the qunit assertions for the test application
setup(QUnit.assert);

// Start the test application
start();
