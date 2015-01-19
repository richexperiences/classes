function setupRoutes() {
	app.get("/",function(req,res){
		res.end("Nothing to see here.");
	});

	// URL rewrite middleware
	app.use(function(req,res,next) {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
		}
		next();
	});

	// static file serving middleware
	app.use(express.static(__dirname));
}

function connection(socket) {

	function disconnect() {
		console.log("Client disconnected!");
		clearInterval(timer);
	}

	function getmsg(msg) {
		io.sockets.emit("broadcast",msg);
	}

	socket.on("disconnect",disconnect);
	socket.on("msg",getmsg);

	var timer = setInterval(function(){
		socket.emit("hello",Math.random());
	},1000);
}


var
	http = require("http"),
	express = require("express"),
	app = express(),
	httpserv = http.createServer(app),
	io = require("socket.io")(httpserv),

	port = 8006,
	host = "127.0.0.1",

	ASQ = require("asynquence")
;

require("asynquence-contrib");

setupRoutes();
httpserv.listen(port, host);

io.on("connection",connection);

