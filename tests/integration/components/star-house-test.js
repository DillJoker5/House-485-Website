import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | star-house', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {

    await render(hbs`<StarHouse::StarHouse />`);

    assert.dom(this.element).exists();
  });
});
