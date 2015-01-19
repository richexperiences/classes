

function setupRoutes() {
	
	// setup route for get requests
	app.get("/",function(req,res){
		res.end("Nothing to see here.");
	});

	// URL rewrite middleware
	// so, this service/server/nodeModule while running continues to process
	app.use(function(req,res,next) {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
		}
		next();
	});

	// static file serving middleware
	app.use(express.static(__dirname));

}


var
	http = require("http"),
	
	express = require("express"), app = express(),
	
	httpserv = http.createServer(app),

	port = 8006,
	host = "127.0.0.1",

	ASQ = require("asynquence") ;

require("asynquence-contrib");

setupRoutes();
httpserv.listen(port, host);
