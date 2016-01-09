'use strict';
var $ = require('jquery');

module.exports = {
	execute: function(method, url, options, success, error) {
		$.ajax({
			method: method,
			url: url,
			data: options,
			success: success,
			error: error
		});
	}
}