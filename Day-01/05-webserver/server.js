var http = require('http'),
	path = require('path'),
	fs = require('fs'),
	url = require('url');

var server = http.createServer(function(req, res){
	var rawResource = req.url === '/' ? '/index.html' : req.url;
	var resource = url.parse(rawResource).pathname;
	var resourcePath = path.join(__dirname, resource);
	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
	}
	var stream = fs.createReadStream(resourcePath);
	stream.on('data', function(chunk){
		res.write(chunk);
	});
	stream.on('end', function(){
		res.end();
	});
});

server.listen(8080);

//res.statusCode = 404;
//res.end()