// Star House Integration Tests

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | star-house', function (hooks) {
  // Setup the rendering hooks
  setupRenderingTest(hooks);

  // Test to verify that the Star House component renders properly
  test('it renders', async function (assert) {
    // Await till the component renders
    await render(hbs`<StarHouse::StarHouse />`);

    // Verify that the Star House element exists
    assert.dom(this.element).exists();
  });
});
