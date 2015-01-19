function handleHTTP(req,res) {
}

var
	http = require("http"),
	httpserv = http.createServer(handleHTTP),

	port = 8006,
	host = "127.0.0.1"
;

httpserv.listen(port, host);
