var url = require('url');

module.exports = function(req){
	var rawResource = req.url === '/' ? '/index.html' : req.url;
	req.resourceObj = url.parse(rawResource);	
}
