var customers = [
  {name: 'Customer A', age: 21},
  {name: 'Customer B', age: 22},
  {name: 'Customer C', age: 23},
  {name: 'Customer D', age: 24},
  {name: 'Customer E', age: 25}
];
 
module.exports = function(server) {
  var dataSource = server.dataSources.mongodb;
  dataSource.automigrate('customer', function(er) {
    if (er) throw er;
    var Model = server.models.Customer;
    //create sample data
    var count = customers.length;
    customers.forEach(function(customer) {
      Model.create(customer, function(er, result) {
        if (er) return;
        console.log('Record created:', result);
        count--;
        if (count === 0) {
          console.log('done');
          dataSource.disconnect();
        }
      });
    });
    //define a custom scope
    Model.scope('youngFolks', {where: {age: {lte: 22 }}});
  });
};

if (require.main === module) {
  // Run the import
  module.exports(require('../../server'), function(err) {
    if (err) {
      console.error('Cannot import sample data - ', err);
    } else {
      console.log('Sample data was imported.');
    }
  });
}
