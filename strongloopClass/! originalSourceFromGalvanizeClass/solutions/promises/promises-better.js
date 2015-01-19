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

require("native-promise-only");

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}


// request all files at once in "parallel"
["file1","file2","file3"]
// via `getFile(..)`
.map(getFile)
.reduce(
	function(chain,filePromise){
		return chain
			// only once previous rendering is done...
			.then(function(){
				return filePromise;
			})
			// ...render output as each file finishes
			.then(output);
	},
	// fulfilled promise to start chain
	Promise.resolve()
)
.then(function() {
	output("Complete!");
});
