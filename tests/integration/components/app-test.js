// App Integration Tests

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | app', function (hooks) {
  // Setup the rendering hooks
  setupRenderingTest(hooks);

  // Test to verify that the App component renders properly
  test('it renders', async function (assert) {
    // Await till the component renders
    await render(hbs`<App />`);

    // Verify that the App element exists
    assert.dom(this.element).exists();
  });
});
