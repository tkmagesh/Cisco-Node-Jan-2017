var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.jpg', '.png', '.xml', '.json'];
function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}

module.exports = function(staticResPath){
	return function(req, res, next){
		var resourceObj = req.resourceObj;
		if (isStatic(resourceObj.pathname)){
			var resourcePath = path.join(staticResPath, resourceObj.pathname);
			if (!fs.existsSync(resourcePath)){
				next();
				return;
			}
			fs.createReadStream(resourcePath).pipe(res);
		} else {
			next();
		}
	}
}