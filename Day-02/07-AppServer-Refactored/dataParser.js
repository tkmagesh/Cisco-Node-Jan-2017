var url = require('url'),
	qs = require('querystring');

module.exports = function(req, res, next){
	var rawResource = req.url === '/' ? '/index.html' : req.url;
	req.resourceObj = url.parse(rawResource);
	req.query = qs.parse(req.resourceObj.query);
	if (req.method === 'POST'){
		var reqDataRaw = '';
		req.on('data', function(chunk){
			reqDataRaw += chunk;
		});
		req.on('end', function(){
			var reqData = qs.parse(reqDataRaw);
			req.body = reqData;
			next();
		});
	} else {
		next();
	}
}
