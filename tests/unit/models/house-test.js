import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | house', function (hooks) {
    setupTest(hooks);

    test('fills in the model', function (assert) {
        let store = this.owner.lookup('service:store');
        let house = store.createRecord('house', {
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
        });

        assert.equal(house.price, 250000);
        assert.equal(house.address, "3454 N Bremen St, Milwaukee, WI 53212");
        assert.equal(house.image, "https://ap.rdcpix.com/07674588a0d1ecd7ecbce450d5f64d78l-m2859139786x.jpg");
        assert.equal(house.location, "3454 N Bremen St, Milwaukee (Milwaukee), Wisconsin (WI) 53212, United States, 43.080845 -87.89972");
        assert.equal(house.description, "Prime Riverwest location blocks from restaurants, parks, the Milwaukee River, the dog park and much much more. This super cute bungalow duplex is a great opportunity for an owner occupant or investor. Both units have hardwood floors, 2 bedrooms and 1 bath. Nice back yard & 2 car detached garage. This is one of the nicest blocks in Riverwest.");
        assert.equal(house.url, "https://www.realtor.com/realestateandhomes-detail/3454-N-Bremen-St_Milwaukee_WI_53212_M95743-61434");
        assert.equal(house.id, "M9574361434");
        assert.equal(house.favorite, false);
        assert.equal(house.lat, 43.080845);
        assert.equal(house.lng, -87.89972);
    });
});