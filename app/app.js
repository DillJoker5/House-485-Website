// Application File

import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'house-485-website/config/environment';

export default class App extends Application {
  // Set the Application's prefixes and resolver
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

// Load the App with the prefix and App
loadInitializers(App, config.modulePrefix);
