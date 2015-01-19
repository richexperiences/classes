module.exports = function(CoffeeShop) {
  CoffeeShop.near= function(here, limit, fn) {
    console.log(here);
    var default_result_count = 40;
    if (typeof limit === 'function') {
      fn = limit;
    }
    limit = Number(limit) || 40;
    CoffeeShop.find( {where: {pos: {near: here}}, limit:limit}, fn
    );
  };

  CoffeeShop.setup = function() {
    CoffeeShop.base.setup.apply(this, arguments);
    // load our data here?

    this.remoteMethod('near', {
      description: 'Find locations near the area defined by the map point',
      accepts: [
        {arg: 'here', type: 'GeoPoint', required: true,
          description: 'geo location (lng & lat)'},
        {arg: 'limit', type: 'Number',
          description: 'max number of results'}
      ],
      returns: {arg: 'locations', root: true},
      http: { verb: 'GET' }
    });
  };

  CoffeeShop.setup();
};
