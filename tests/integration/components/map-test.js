// Map Integration Tests

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ENV from 'house-485-website/config/environment';

module('Integration | Component | map', function (hooks) {
  // Setup the rendering hooks
  setupRenderingTest(hooks);

  // Test to verify that the Map component renders correctly with the specific parameters
  test('it renders a map image for the specified params', async function (assert) {
    // Await till the component renders with the specific parameters
    await render(hbs`<Map
      @lat="43.142911"
      @lng="-87.984637"
      @zoom="10"
      @width="50"
      @height="100"
    />`);

    // Verify that the Map component exists and renders with the correct attributes
    assert
      .dom('.map img')
      .exists()
      .hasAttribute('alt', 'House Map Image at coordinates (43.142911, -87.984637)')
      .hasAttribute('src')
      .hasAttribute('width', '50')
      .hasAttribute('height', '100');

    // Grab the source from the map image
    let { src } = find('.map img');

    // Grab the Mapbox code from the environment file
    let token = encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);

    // Verify that the source starts with the Mapbox api url
    assert.ok(
      src.startsWith('https://api.mapbox.com/'),
      'the source starts with "https://api.mapbox.com/"'
    );

    // Verify that the source contains the latitude and longitude parameters
    assert.ok(
      src.includes('-87.984637,43.142911'),
      'the source includes the lng, lat, zoom parameters'
    );

    // Verify that the source contains the width, height, and @2x parameters
    assert.ok(
      src.includes('50x100@2x'),
      'the source includes the width, height, and @2x parameters'
    );

    // Verify that the source contains the access token
    assert.ok(
      src.includes(`access_token=${token}`),
      'the source includes the escaped access token'
    );
  });

  // Test to verify that the default alternative attribute can be overridden
  test('the default alt attribute can be overridden', async function (assert) {
    // Await till the component renders
    await render(hbs`<Map
      @lat="43.080845"
      @lng="-87.89972"
      @zoom="10"
      @width="50"
      @height="100"
      alt="House Map Image at coordinates near Milwaukee"
    />`);

    // Verify that the Map component renders with the overridden alternative attribute
    assert.dom('.map img').hasAttribute('alt', 'House Map Image at coordinates near Milwaukee');
  });

  // Test to verify that the width, height, and source attributes cannot be overridden
  test('the source, width, and height attributes cannot be overridden', async function (assert) {
    // Await till the component renders
    await render(hbs`<Map
      @lat="43.080845"
      @lng="-87.89972"
      @zoom="10"
      @width="50"
      @height="100"
      src="/assets/images/icon.jpg"
      width="200"
      height="300"
    />`);

    // Verify that the component renders correctly with the above parameters
    assert
      .dom('.map img')
      .hasAttribute('src', /^https:\/\/api.mapbox\.com\//)
      .hasAttribute('width', '50')
      .hasAttribute('height', '100');
  });

  // Test to verify that the source updates when certain arguments of the Map component are changed
  test('it updates the source when the necessary args change', async function (assert) {
    // Setup the default properties of the Map component
    this.setProperties({
      lat: 43.08308,
      lng: -88.017956,
      zoom: 10,
      width: 50,
      height: 100,
    });

    // Await till the component renders
    await render(hbs`<Map
      @lat={{this.lat}}
      @lng={{this.lng}}
      @zoom={{this.zoom}}
      @width={{this.width}}
      @height={{this.height}}
    />`);

    // Grab the Map component's image
    let img = find('.map img');

    // Verify that the source contains the latitude, longitude, and zoom parameters
    assert.ok(
      img.src.includes('-88.017956,43.08308,10'),
      'the source includes the lng, lat, and zoom parameters'
    );

    // Verify that the source contains the width, height, and @2x parameters
    assert.ok(
      img.src.includes('50x100@2x'),
      'the source includes the width, height, and @2x parameters'
    );

    // Setup different properties for the Map component to force it to rerender
    this.setProperties({
      width: 100,
      height: 200,
      zoom: 12,
    });

    // Verify that the new source contains the new latitude, longitude, and zoom parameters
    assert.ok(
      img.src.includes('-87.89972,43.080845,12'),
      'the source includes the lng, lat, and zoom parameters'
    );

    // Verify that the new source contains the width, height, and @2x parameters
    assert.ok(
      img.src.includes('100x200@2x'),
      'the source includes the width, height, and @2x paramters'
    );

    // Setup different properties for the Map component to force it to rerender
    this.setProperties({
      lat: 47.6062,
      lng: -122.3321,
    });

    // Verify that the new source contains latitude, longitude, and zoom parameters
    assert.ok(
      img.src.includes('-122.3321,47.6062,12'),
      'the source includes the lng, lat, and zoom parameters'
    );

    // Verify that the new source contains the new width, height, and @2x parameters
    assert.ok(
      img.src.includes('100x200@2x'),
      'the source includes the width, height, and @2x parameters'
    );
  })
});
