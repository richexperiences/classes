function handleHTTP(req,res) {
	if (req.method === "GET") {
		if (req.url === "/"){
			res.writeHead(200, { "content-type": "text/html" } );
			res.end("Hello World: " + Math.random() ); 
		} else {
			res.writeHead(403)
			res.end();
		}
	} else {
		res.writeHead(403)
		res.end();
	}	
}

var
	http = require("http"),
	httpserv = http.createServer(handleHTTP),

	port = 8006,
	host = "127.0.0.1"
;

httpserv.listen(port, host);
