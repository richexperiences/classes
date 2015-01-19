var loadtest = require('loadtest');

var max_requests = 100000
var concurrency = 10

// Run high loads of this request to burn cpu.
var add_coffee = {
    url: 'http://localhost:' + 3000 + '/api/Coffees',
    maxRequests: max_requests,
    concurrency: 10,
    method: 'POST',
    contentType: 'application/json',
    body: {"Name": "Hawaiian Kona Coffee", "RoastType": "Medium"}
};

loadtest.loadTest(add_coffee, function(error, result)
{
    console.log(error);
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Added coffee');
    console.log(result);
});


var add_beans = {
    url: 'http://localhost:3000/api/Coffees/beans',
    maxRequests: max_requests,
    concurrency: concurrency,
    method: "POST",
    body: 'I am a bean'
};
loadtest.loadTest(add_beans, function(error, result)
{
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Added beans');
    console.log(result);
});

