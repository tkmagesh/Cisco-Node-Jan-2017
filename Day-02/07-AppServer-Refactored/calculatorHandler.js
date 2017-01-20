var qs = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res){
	var resourceObj = req.resourceObj;
	if (resourceObj.pathname === '/calculator' && req.method === 'GET'){
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
		
	}
}