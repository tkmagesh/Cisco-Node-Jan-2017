var http = require('http'),
	path = require('path'),
	fs = require('fs'),
	url = require('url'),
	qs = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.js', '.css', '.jpg', '.png', '.xml', '.json'];
function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}
var server = http.createServer(function(req, res){
	var rawResource = req.url === '/' ? '/index.html' : req.url;
	var resourceObj = url.parse(rawResource);

	if (isStatic(resourceObj.pathname)){
		var resourcePath = path.join(__dirname, resourceObj.pathname);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (resourceObj.pathname === '/calculator' && req.method === 'GET'){
		var reqData = qs.parse(resourceObj.query),
			op = reqData.op,
			n1 = parseInt(reqData.n1,10),
			n2 = parseInt(reqData.n2, 10);

		var result = calculator[op](n1,n2);
		res.write(result.toString());
		res.end();
	} else if (resourceObj.pathname === '/calculator' && req.method === 'POST'){
		var reqDataRaw = '';
		req.on('data', function(chunk){
			reqDataRaw += chunk;
		});
		req.on('end', function(){
			var reqData = qs.parse(reqDataRaw),
				op = reqData.op,
				n1 = parseInt(reqData.n1,10),
				n2 = parseInt(reqData.n2, 10);

			var result = calculator[op](n1,n2);
			res.write(result.toString());
			res.end();
		})
		
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

//res.statusCode = 404;
//res.end()
// /calculator?op=add&n1=100&n2=200