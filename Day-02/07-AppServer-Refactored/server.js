var http = require('http'),
	path = require('path'),
	chalk = require('chalk'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler'),
	app = require('./app');

app.use(dataParser);
app.use(serveStatic(path.join(__dirname, '/public')));
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8080);

console.log(chalk.bold.red('server listening on port 8080'));