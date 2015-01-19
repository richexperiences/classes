
function say(filename,cb) {
	fs.readFile(filename,function(err,msg){
		// error first CB
		if (err) {
			cb(err);
		}
		else {
			setTimeout(function(){
				cb(null,msg);
			},1000);
		}
	});
}

var fs = require("fs");

module.exports.say = say;
