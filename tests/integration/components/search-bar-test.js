import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | search-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {

    await render(hbs`<SearchBar::SearchBar />`);

    assert.dom(this.element).hasText('');
  });
});
