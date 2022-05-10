// House Image Integration Tests

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | house/image', function (hooks) {
    // Setup the rendering hooks
    setupRenderingTest(hooks);

    // Test to verify that the House Image component renders with the correct image
    test('it renders the component with the given image', async function (assert) {
        // Await till the component renders
        await render(hbs`<House::Image />`);

        // Verify that the element has the "View Open" text
        assert.dom(this.element).hasText('View Open');

        // Await till the component renders with the alt and src attributes
        await render(hbs`
            <House::Image
                src="/assets/images/icon.jpg"
                alt="Icon"
            />
        `);

        // Verify that the component exists and has the correct attributes
        assert
            .dom('.image img')
            .exists()
            .hasAttribute('src', '/assets/images/icon.jpg')
            .hasAttribute('alt', 'Icon');
    });

    // Test to verify that clicking on the image toggles the size of the image
    test('clicking on the component toggles its size', async function (assert) {
        // Await the render of the house image component
        await render(hbs`
            <House::Image
                src="/assets/images/icon.jpg"
                alt="Icon"
            />
        `);

        // Verify that the component exists
        assert.dom('button.image').exists();

        // Verify basic attributes of the component
        assert.dom('.image').doesNotHaveClass('Open');
        assert.dom('.image small').hasText('View Open');

        // Await the click of the component
        await click('button.image');

        // Verify that the class and text changed accordingly
        assert.dom('.image').hasClass('open');
        assert.dom('.image small').hasText('View Close');

        // Await the click of the component
        await click('button.image');

        // Verify that the class and text changed accordingly
        assert.dom('.image').doesNotHaveClass('open');
        assert.dom('.image small').hasText('View Open');
    });
});
