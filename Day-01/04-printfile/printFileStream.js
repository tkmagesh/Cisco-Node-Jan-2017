var fs = require('fs');
var stream = fs.createReadStream('dummy.txt', {encoding : 'utf8'});
//stream => ReadableStream
//				- open
//				- data
//				- end
//				- close
//				- error

stream.on('data', function(chunk){
	console.log(chunk);
});

stream.on('end', function(){
	console.log('============== EOF =================');
});

stream.on('error', function(err){
	console.log('Something went wrong!!');
	console.log(err);
	return;
})
