var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.jpg', '.png', '.xml', '.json'];
function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}

module.exports = function(req, res){
	var resourceObj = req.resourceObj;
	if (isStatic(resourceObj.pathname)){
		var resourcePath = path.join(__dirname, resourceObj.pathname);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		//fs.createReadStream(resourcePath).pipe(res);
		var stream = fs.createReadStream(resourcePath);
		stream.on('data', function(chunk){
			console.log('[serveStatic] - serving file contents')
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('[serveStatic] - serving file contents - done')
			res.end();
		})
	}
}