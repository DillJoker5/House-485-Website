import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | house', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders information about a house', async function (assert) {
    this.setProperties({
      house: {
        "properties": [
            {
                "property_id": "M9574361434",
                "price": 250000,
                "address": {
                    "city": "Milwaukee",
                    "country": "United States",
                    "county": "Milwaukee",
                    "lat": 43.080845,
                    "line": "3454 N Bremen St",
                    "postal_code": "53212",
                    "state_code": "WI",
                    "state": "Wisconsin",
                    "lon": -87.89972
                },
                "rdc_web_url": "https://www.realtor.com/realestateandhomes-detail/3454-N-Bremen-St_Milwaukee_WI_53212_M95743-61434",
                "description": "Prime Riverwest location blocks from restaurants, parks, the Milwaukee River, the dog park and much much more. This super cute bungalow duplex is a great opportunity for an owner occupant or investor. Both units have hardwood floors, 2 bedrooms and 1 bath. Nice back yard & 2 car detached garage. This is one of the nicest blocks in Riverwest.",
                "photos": [
                    {
                        "href": "https://ap.rdcpix.com/07674588a0d1ecd7ecbce450d5f64d78l-m2859139786x.jpg"
                    }
                ]
            }
        ]
    }
    });

    await render(hbs`<House @house={{this.hosue}} />`);

    assert.dom('article').hasClass('house');
    assert.dom('article .image').exists();
    assert.dom('article h3').exists();
    assert.dom('article .detail.index').includesText('1');
    assert.dom('article .detail.address').includesText('3454 N Bremen St, Milwaukee, WI 53212');
    assert.dom('article .detail.price').includesText('250000');
    assert.dom('article .detail.location').includesText('3454 N Bremen St, Milwaukee (Milwaukee), Wisconsin (WI) 53212, United States, 43.080845 -87.89972');
    assert.dom('article .detail.description').includesText('Prime Riverwest location blocks from restaurants, parks, the Milwaukee River, the dog park and much much more. This super cute bungalow duplex is a great opportunity for an owner occupant or investor. Both units have hardwood floors, 2 bedrooms and 1 bath. Nice back yard & 2 car detached garage. This is one of the nicest blocks in Riverwest.');
    assert.dom('article .map').exists();
    assert.dom('article h3').exists();
  });
});
