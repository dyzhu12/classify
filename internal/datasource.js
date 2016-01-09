'use strict';
var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = {
	initialize: initialize,
	getList: getList
};

var courses = [];

function initialize() {

	if (courses.length === 0) {
		client.get('http://api.umd.io/v0/courses/list', function(data) {
			courses = data;
		});
	}
}
function getList(keywords) {
	var filteredList = [];

	if (keywords.length > 0) {
		courses.forEach(function(course) {
			keywords.forEach(function(keyword) {
				var name = course.name.toLowerCase();
				var department = course.department.toLowerCase();
				var keyword = keyword.toLowerCase();
				if (keyword.length > 1 && (name.indexOf(keyword) > -1 || department.indexOf(keyword) > -1)) {
					filteredList.push({
						id: course.course_id,
						name: course.name
					});
				}
			});
		});
	}
	
	return filteredList;
}
