var fs = require('fs');

var fileContents = fs.readFileSync('dummy.txt', {encoding : 'utf8'});
console.log(fileContents);
console.log('============== EOF =================');