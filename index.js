'use strict';

var http = require('http'),
	fs = require('fs'),
	index;


module.exports = function (options) {
	var default_index = __dirname + '/index.html',
		data = [];

	index = fs.readFileSync(options.index || default_index, 'utf8');

	options = options || {};

	http.createServer(function (req, res) {
			if (req.url === '/data') {
				res.end(JSON.stringify(data));
				data = [];
			}
			return res.end(index);
		})
		.listen(options.port || 8181);

	return function (start, end) {
		data.push([start, end]);
		data = data.slice(-1000);
	};
};
