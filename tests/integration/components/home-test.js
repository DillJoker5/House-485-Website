import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | home', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      houses: [
        {
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
        },
        {
            "properties": [
                {
                    "property_id": "M9860593060",
                    "price": 169900,
                    "address": {
                        "city": "Milwaukee",
                        "country": "United States",
                        "county": "Milwaukee",
                        "lat": 43.142911,
                        "line": "5804 W Boehlke Ave",
                        "postal_code": "53223",
                        "state_code": "WI",
                        "state": "Wisconsin",
                        "lon": -87.984637
                    },
                    "rdc_web_url": "https://www.realtor.com/realestateandhomes-detail/5804-W-Boehlke-Ave_Milwaukee_WI_53223_M98605-93060",
                    "description": "Welcome Home! Ready to move in 3 bedroom ranch on quiet dead end street of Milwaukee!! This home boasts hardwood floors, extra half bath with access from master, newer appliances, clean basement with rec room, huge garage and driveway access.",
                    "photos": [
                        {
                            "href": "https://ap.rdcpix.com/646b5f5d8099fe39f70040973471a6dfl-m4192583232x.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "properties": [
                {
                    "property_id": "M9975913199",
                    "price": 239900,
                    "address": {
                        "city": "Milwaukee",
                        "country": "United States",
                        "county": "Milwaukee",
                        "lat": 43.08308,
                        "line": "3521 N 84th St",
                        "postal_code": "53222",
                        "state_code": "WI",
                        "state": "Wisconsin",
                        "lon": -88.017956
                    },
                    "rdc_web_url": "https://www.realtor.com/realestateandhomes-detail/3521-N-84th-St_Milwaukee_WI_53222_M99759-13199",
                    "description": "Excellent location for this fully remodeled 3 bedroom 2 full bath cape code home. New kitchen with granite countertops and new appliances. Open concept kitchen and living room. Full bath on the main floor. Upstairs has spacious master suite with new bathroom. Additional space in the finished lower level. Fenced yard and detached garage. Come take a look before it is too late!",
                    "photos": [
                        {
                            "href": ""
                        }
                    ]
                }
            ]
        },
        {
            "properties": [
                {
                    "property_id": "M9280798386",
                    "price": 129900,
                    "address": {
                        "city": "Milwaukee",
                        "country": "United States",
                        "county": "Milwaukee",
                        "lat": 43.124697,
                        "line": "5866 N 77th St",
                        "postal_code": "53218",
                        "state_code": "WI",
                        "state": "Wisconsin",
                        "lon": -88.006957
                    },
                    "rdc_web_url": "https://www.realtor.com/realestateandhomes-detail/5866-N-77th-St_Milwaukee_WI_53218_M92807-98386",
                    "description": "Home though move in ready will need some TLC. Come see this adorable 3BR ranch. Fenced in yard. Clean inside and out. Kept in good condition. Basement is finished with extra room for storage and laundry area.",
                    "photos": [
                        {
                            "href": "https://ap.rdcpix.com/9d3a09b054c893a5a59d4c3448959bd7l-m1787232611x.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "properties": [
                {
                    "property_id": "M9109673904",
                    "price": 69000,
                    "address": {
                        "city": "Milwaukee",
                        "country": "United States",
                        "county": "Milwaukee",
                        "lat": 43.143661,
                        "line": "6932 N Raintree Dr Unit B",
                        "postal_code": "53223",
                        "state_code": "WI",
                        "state": "Wisconsin",
                        "lon": -87.983248
                    },
                    "rdc_web_url": "https://www.realtor.com/realestateandhomes-detail/6932-N-Raintree-Dr-Unit-B_Milwaukee_WI_53223_M91096-73904",
                    "description": "LIMITED PICTURES, BOOK A SHOWING",
                    "photos": [
                        {
                            "href": "https://ap.rdcpix.com/857c4bf97321ad28384c901c76f7a0d8l-m3110109346x.jpg"
                        }
                    ]
                }
            ]
        }
      ],
    });
  });

  test('it renders all mocked up house properties by default', async function (assert) {
    await render(hbs`<House @houses={{this.houses}} />`);

    assert.dom('.houses').exists();
    assert.dom('.houses input').exists();

    assert.dom('.houses .results').exists();
    assert.dom('.houses .results li').exists({ count: 5 });

    assert
      .dom('.houses .results li:nth-of-type(1)')
      .containsText('3454 N Bremen St, Milwaukee, WI 53212');

    assert
      .dom('.houses .results li:nth-of-type(2)')
      .containsText('5804 W Boehlke Ave, Milwaukee, WI 53223');

    assert
      .dom('.houses .results li:nth-of-type(3)')
      .containsText('3521 N 84th St, Milwaukee, WI 53222');

    assert
      .dom('.houses .results li:nth-of-type(4)')
      .containsText('5866 N 77th St, Milwaukee, WI 53218');

    assert
      .dom('.houses .results li:nth-of-type(5)')
      .containsText('6932 N Raintree Dr Unit B, Milwaukee, WI 53223');
  });

  test('it updates the results according to the search string', async function (assert) {
    await render(hbs`<Home @houses={{this.houses}} />`);
    
    assert.dom('.houses').exists();
    assert.dom('.houses input').exists();

    await fillIn('.houses input', '6932 N Raintree Dr Unit B');

    assert.dom('.houses .results').exists();
    assert.dom('.houses .results li').exists({ count: 1 });
    assert.dom('.houses .results li').containsText('6932 N Raintree Dr Unit B');

    await fillIn('5866 N 77th St');

    assert.dom('.houses .results').exists();
    assert.dom('.houses .results li').exists({ count: 1 });
    assert.dom('.houses .results li').containsText('5866 N 77th St');
  });
});
