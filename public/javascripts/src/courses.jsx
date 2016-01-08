'use strict';
var React = require('react');

module.exports = React.createClass({

	render: function() {
		var courseList = this.props.courseList;
		var keywords = this.props.keywords;
		var filteredList = [];

		courseList.forEach(function(course) {
			keywords.forEach(function(keyword) {
				var name = course.name.toLowerCase();
				var department = course.department.toLowerCase();
				var keyword = keyword.toLowerCase();
				if (name.indexOf(keyword) > -1 || department.indexOf(keyword) > -1) {
					console.log('Accept String');
					filteredList.push({
						id: course.course_id,
						name: course.name
					});
				}
			});
		});
		return (
			<ul>
			{
				filteredList.map(function(entry) {
					return (
						<li>
							<a>{entry.id}: <span>{entry.name}</span></a>
						</li>
					);
				})
			}
			</ul>
		);
	}
});
