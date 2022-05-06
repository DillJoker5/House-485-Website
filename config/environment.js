'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'house-485-website',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false,
      },
    },

    APP: {},
  };

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  ENV.MAPBOX_ACCESS_TOKEN = 'sk.eyJ1IjoiZHRjMTAxIiwiYSI6ImNsMWZiNG9uNTAwcGgzaXRjYTc0MGtiNzcifQ.M8qb4kzgH7XKliz1ERaUtQ';
  ENV.REALTY_TOKEN = '288b065a66msh365398d4ed7716ep150ff1jsn97f8529b3312';

  return ENV;
};
