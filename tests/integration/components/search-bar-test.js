// Search Bar Integration Tests

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | search-bar', function (hooks) {
  // Setup the rendering hooks
  setupRenderingTest(hooks);

  // Test to verify that the Search Bar component renders properly
  test('it renders', async function (assert) {
    // Await till the component renders
    await render(hbs`<SearchBar::SearchBar />`);

    // Verify that the Search Bar element renders with no default text
    assert.dom(this.element).hasText('');
  });
});
