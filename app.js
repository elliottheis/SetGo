var express = require('express'),
    sys = require("sys"),

    expressServer = express.createServer(),
    argv = process.argv.slice(1),
    port = 8000,
    arg;

while ((arg = argv.shift()) != null) {
    if (arg === '-p' || arg === '--port') {
        port = Number(argv.shift());
    }
}

expressServer
    .use(express.responseTime())
    .use(express.logger())
    .use(express.static(__dirname, {maxAge: 60000}))
    .listen(port);

sys.log('static server listening on port ' + port + ', serving from ' + __dirname);
