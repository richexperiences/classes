require("native-promise-only");

var ASQ = require("asynquence");
require("asynquence-contrib");


function makePromise(x) {
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			if (x % 2 == 0) resolve(x);
			else reject(x);
		},500);
	});
}

function makeSeq(x) {
	return ASQ(function(done){
		setTimeout(function(){
			if (x % 2 == 0) done(x);
			else done.fail(x);
		},500);
	});
}

function errorHandler(e) {
	console.error("Error: " + e);
}

makePromise(2)
.then(
	function(msg){
		console.log(msg);
		return makePromise(4);
	}
)
.then(
	function(msg){
		console.log(msg);
		return makePromise(5);
	}
)
.then(
	function(){
		console.log("never gets here");
	},
	errorHandler
);


makeSeq(20)
.seq(
	function(msg) {
		console.log(msg);
		return makeSeq(40);
	}
)
.seq(
	function(msg) {
		console.log(msg);
		return makeSeq(51);
	}
)
.val(
	function() {
		console.log("never gets here");
	}
)
.or(errorHandler);
