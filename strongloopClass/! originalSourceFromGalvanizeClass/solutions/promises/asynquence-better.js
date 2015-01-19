function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

var ASQ = require("asynquence");
require("asynquence-contrib");

function getFile(file) {
	return ASQ(function(done){
		fakeAjax(file,done);
	});
}


ASQ()
.map(
	// request all files at once in "parallel"
	["file1","file2","file3"],
	function(file,done){
		// via `getFile(..)`
		done( getFile(file) );
	}
)
.map(function(sq,done){
	// render output as each file finishes...
	done( function(){
		return sq.val(output);
	} );
})
.seq(function(sqs){
	// ...only once previous rendering is done
	return ASQ().seq.apply(null,sqs);
})
.val(function(){
	output("Complete!");
});
