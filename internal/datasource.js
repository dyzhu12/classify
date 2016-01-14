'use strict';
var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = {
	initialize: initialize,
	getList: getList,
	getDepartments: getDepartments
};

var coursesAndDepartments = {};
var storedDepartments = [];

function initialize(cb) {
	var self = this;
	if (Object.keys(coursesAndDepartments).length === 0) {
		// Ugh change this to async after you get a working version up
		client.get('http://api.umd.io/v0/courses/list', function(data) {
			client.get('http://api.umd.io/v0/courses/departments', function(departments) {
				departments.forEach(function(dept) {
					storedDepartments.push(dept);
					var specificCourses = [];
					data.forEach(function(course) {
						if (course.course_id.indexOf(dept) > -1) {
							specificCourses.push(course);
						}
					});
					coursesAndDepartments[dept] = specificCourses;
				});
				cb();
			});
		});
		
	} else {
		cb();
	}

}
function getList(keywords, cb) {
	var filteredCoursesAndDepartments = {};
	var count = 0;
	if (keywords.length > 0) {
		Object.keys(coursesAndDepartments).forEach(function(deptCode) {
			var filteredList = [];
			coursesAndDepartments[deptCode].forEach(function(course, index) {
				var id = course.course_id.toLowerCase();
				var name = course.name.toLowerCase();
				var department = course.department.toLowerCase();

				keywords.forEach(function(keyword, index) {
					var keyword = keyword.toLowerCase();
					if (keyword.length > 1 && (id.indexOf(keyword) > -1 || name.indexOf(keyword) > -1 || department.indexOf(keyword) > -1)) {
						var obj = {
							id: course.course_id,
							name: course.name
						};

						var found = false;
						for(var i = 0; i < filteredList.length; i++) {
							var filter = filteredList[i];
							if (filter.id === obj.id) {
								found = true;
							}
						}
						if (!found) {
							filteredList.push(obj);
						}
					}
				});
			});
			if (filteredList.length > 0) {
				filteredCoursesAndDepartments[deptCode] = filteredList;
			}
		});
	}
	cb(filteredCoursesAndDepartments);
}

function getDepartments(cb) {
	cb(storedDepartments);
}