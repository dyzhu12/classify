'use strict';
var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = {
	initialize: initialize,
	getList: getList
};

var coursesAndDepartments = [];

function initialize() {
	var self = this;
	if (coursesAndDepartments.length === 0) {
		// Ugh change this to async after you get a working version up
		client.get('http://api.umd.io/v0/courses/list', function(data) {
			client.get('http://api.umd.io/v0/courses/departments', function(departments) {
				departments.forEach(function(dept) {
					var specificCourses = [];
					data.forEach(function(course) {
						if (course.course_id.indexOf(dept) > -1) {
							specificCourses.push(course);
						}
					});
					var courseObj = {};
					courseObj.department_id = dept;
					courseObj.course_list = specificCourses;
					coursesAndDepartments.push(courseObj);
				});

			});
		});
		
	}

}
function getList(keywords) {
	var filteredCoursesAndDepartments = [];

	if (keywords.length > 0) {
		coursesAndDepartments.forEach(function(courseAndDepartment) {
			var filteredList = [];
			courseAndDepartment.course_list.forEach(function(course) {

				var id = course.course_id.toLowerCase();
				var name = course.name.toLowerCase();
				var department = course.department.toLowerCase();

				keywords.forEach(function(keyword) {
					var keyword = keyword.toLowerCase();
					if (keyword.length > 1 && (id.indexOf(keyword) > -1 || name.indexOf(keyword) > -1 || department.indexOf(keyword) > -1)) {
						filteredList.push({
							id: course.course_id,
							name: course.name
						});
					}
				});
			});

			if (filteredList.length > 0) {
				var obj = {};
				obj.department_id = courseAndDepartment.department_id;
				obj.course_list = filteredList;
				filteredCoursesAndDepartments.push(obj);
			}
		});
	}

	return filteredCoursesAndDepartments;
}
