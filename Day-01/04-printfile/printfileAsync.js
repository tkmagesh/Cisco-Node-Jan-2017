var fs = require('fs');
function handleFileRead(err, fileContents){
	if (err){
		console.log('Something went wrong!!');
		console.log(err);
		return;
	}
	console.log(fileContents);	
	console.log('============== EOF =================');
}

fs.readFile('dummy.txt', {encoding : 'utf8'}, handleFileRead);

