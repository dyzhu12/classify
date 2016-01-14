'use strict';
var React = require('react');
var bridge = require('./comm/bridge');
var classLink = 'https://ntst.umd.edu/soc/search?courseId={{id}}&sectionId=&termId=201601&_openSectionsOnly=on&courseLevelFilter=ALL&instructor=&teachingCenter=ALL&courseStartCompare=&courseStartHour=&courseStartMin=&courseStartAM='

module.exports = React.createClass({

	render: function() {
		var self = this;
		var resultCount = 0;
		var filteredList = this.props.filteredList;
		var departments = Object.keys(filteredList);
		for (var i = 0; i < departments.length; i++) {
			resultCount += filteredList[departments[i]].length;
		}
		console.log(filteredList);
		return (
			<div className='container'>
				<p id='results'>Showing {resultCount} results.</p>
				{
					departments.map(function(dept) {
						if (filteredList[dept] !== undefined && filteredList[dept].length > 0) {
							return (
								<div>
									<p className='dept-header'>{dept} ({filteredList[dept].length})</p>
									<ul>
									{
										filteredList[dept].map(function(course) {
											return (
												<li>
													<a href={classLink.replace('{{id}}', course.id)}
														target='_blank'
														className='class-link'>
														{course.id}:  <span className='description'>{course.name}</span>
													</a>
												</li>
											);
										})
									}
									</ul>
								</div>
							);
						}
					})
				}
			</div>
		);
	}
});


