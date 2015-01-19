module.exports = function(Coffee) {
  var beanjar = []
  function Coffees() {
  }
  Coffee.beans = function(msg, cb) {
      for (var i=0; i < 100; i++) {
       docs.push(new Coffees);
      }
      cb(null, 'Adding coffee beans to jar' + msg);
    }

    var docs = []
    Coffee.remoteMethod(
        'beans',
        {
          accepts: {arg: 'bean', type: 'string'},
          returns: {arg: 'bean', type: 'string'}
        }
    );
};
