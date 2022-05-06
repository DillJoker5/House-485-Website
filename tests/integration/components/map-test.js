import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ENV from 'house-485-website/config/environment';

module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image for the specified params', async function (assert) {
    await render(hbs`<Map
      @lat="43.142911"
      @lng="-87.984637"
      @zoom="10"
      @width="50"
      @height="100"
    />`);

    assert
      .dom('.map img')
      .exists()
      .hasAttribute('alt', 'House Map Image at coordinates (43.142911, -87.984637)')
      .hasAttribute('src')
      .hasAttribute('width', '50')
      .hasAttribute('height', '100');

    let { src } = find('.map img');
    let token = encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);

    assert.ok(
      src.startsWith('https://api.mapbox.com/'),
      'the source starts with "https://api.mapbox.com/"'
    );

    assert.ok(
      src.includes('-87.984637,43.142911'),
      'the source includes the lng, lat, zoom parameters'
    );

    assert.ok(
      src.includes('50x100@2x'),
      'the source includes the width, hiehgt, and @2x parameters'
    );

    assert.ok(
      src.includes(`access_token=${token}`),
      'the source includes the escaped access token'
    );
  });

  test('the default alt attribute can be overridden', async function (assert) {
    await render(hbs`<Map
      @lat="43.080845"
      @lng="-87.89972"
      @zoom="10"
      @width="50"
      @height="100"
      alt="House Map Image at coordinates near Milwaukee"
    />`);

    assert.dom('.map img').hasAttribute('alt', 'House Map Image at coordinates near Milwaukee');
  });

  test('the source, width, and height attributes cannot be overridden', async function (assert) {
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

    assert
      .dom('.map img')
      .hasAttribute('src', /^https:\/\/api.mapbox\.com\//)
      .hasAttribute('width', '50')
      .hasAttribute('height', '100');
  });

  test('it updates the source when the necessary args change', async function (assert) {
    this.setProperties({
      lat: 43.08308,
      lng: -88.017956,
      zoom: 10,
      width: 50,
      height: 100,
    });

    await render(hbs`<Map
      @lat={{this.lat}}
      @lng={{this.lng}}
      @zoom={{this.zoom}}
      @width={{this.width}}
      @height={{this.height}}
    />`);

    let img = find('.map img');

    assert.ok(
      img.src.includes('-88.017956,43.08308,10'),
      'the source includes the lng, lat, and zoom parameters'
    );

    assert.ok(
      img.src.includes('50x100@2x'),
      'the source includes the width, height, and @2x parameters'
    );

    this.setProperties({
      width: 100,
      height: 200,
      zoom: 12,
    });

    assert.ok(
      img.src.includes('-87.89972,43.080845,12'),
      'the source includes the lng, lat, and zoom parameters'
    );

    assert.ok(
      img.src.includes('100x200@2x'),
      'the source includes the width, height, and @2x paramters'
    );

    this.setProperties({
      lat: 47.6062,
      lng: -122.3321,
    });

    assert.ok(
      img.src.includes('-122.3321,47.6062,12'),
      'the source includes the lng, lat, and zoom parameters'
    );

    assert.ok(
      img.src.includes('100x200@2x'),
      'the source includes the width, height, and @2x parameters'
    );
  })
});
