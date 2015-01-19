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
	var channel_id;

	function disconnect() {
		console.log("disconnected");

		if (channel_id && channels[channel_id]) {
			for (var i=0; i<channels[channel_id].sockets.length; i++) {
				if (socket !== channels[channel_id].sockets[i]) {
					channels[channel_id].sockets[i].emit("disconnect");
				}
				channels[channel_id].sockets[i].leave("channel:" + channel_id);
				channels[channel_id].sockets[i] = null;
			}
			channels[channel_id] = null;
			channel_id = null;
		}
	}

	function onSignal(msg) {
		console.log("relaying signal:",msg);
		socket.broadcast.emit("signal",msg);
	}

	socket.on("disconnect",disconnect);
	socket.on("signal",onSignal);

	// is there a channel waiting for a socket to join it?
	if (
		channels.length > 0 &&
		channels[channels.length-1] &&
		channels[channels.length-1].sockets.length === 1
	) {
		console.log("sockets joining channel: " + (channels.length-1));

		channels[channels.length-1].sockets.push(socket);

		// join both sockets to the channel
		for (var i=0; i<2; i++) {
			channels[channels.length-1].sockets[i].join("channel:" + channel_id);
		}

		// identify caller and receiver
		channels[channels.length-1].sockets[0].emit("identify",/*caller=*/true);
		channels[channels.length-1].sockets[1].emit("identify",/*caller=*/false);
	}
	// make a new channel
	else {
		channels[channels.length] = {
			sockets: [socket]
		};
	}

	// save this socket's channel_id
	channel_id = channels.length - 1;

	console.log("user assigned to channel: " + channel_id);
}


var
	http = require("http"),
	express = require("express"),
	app = express(),
	httpserv = http.createServer(app),
	io = require("socket.io")(httpserv),

	port = 8006,
	host = "127.0.0.1",

	ASQ = require("asynquence"),

	channels = []
;

require("asynquence-contrib");

setupRoutes();
httpserv.listen(port, host);

io.of("/rtc").on("connection",connection);

