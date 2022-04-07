import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | house/image', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component with the given image', async function (assert) {
        await render(hbs`<House::Image />`);

        assert.dom(this.element).hasText('');

        await render(hbs`
            <House::Image
                src="/assets/images/icon.jpg"
                alt="Icon"
            />
        `);

        assert
            .dom('.image img')
            .exists()
            .hasAttribute('src', '/assets/images/icon.jpg')
            .hasAttribute('alt', 'Icon');
    });

    test('clicking on the component toggles its size', async function (assert) {
        await render(hbs`
            <House::Image
                src="/assets/images/icon.jpg"
                alt="Icon"
            />
        `);

        assert.dom('button.image').exists();

        assert.dom('.image').doesNotHaveClass('Open');
        assert.dom('.image small').hasText('View Open');

        await click('button.image');

        assert.dom('.image').hasClass('open');
        assert.dom('.image close').hasText('View Close');

        await click('button.image');

        assert.dom('.image').doesNotHaveClass('open');
        assert.dom('.image small').hasText('View Open');
    });
});