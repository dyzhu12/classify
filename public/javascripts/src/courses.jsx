'use strict';
var React = require('react');
var bridge = require('./comm/bridge');
var Masonry = require('masonry-layout');
var classLink = 'https://ntst.umd.edu/soc/search?courseId={{id}}&sectionId=&termId=201601&_openSectionsOnly=on&courseLevelFilter=ALL&instructor=&teachingCenter=ALL&courseStartCompare=&courseStartHour=&courseStartMin=&courseStartAM='

module.exports = React.createClass({

	componentDidUpdate: function() {
		if (this.props.filteredList.length > 0) {
			var grid = document.querySelector('.grid');
			var masonry = new Masonry(grid, {
				itemSelector: '.grid-item',
				columndWidth: '.grid-sizer',
				percentPosition: true
			});
		}
	},
	render: function() {
		var self = this;
		return (
			<div className='container grid'>
			<div className='grid-sizer'></div>
			{
				this.props.filteredList.map(function(courseAndDepartment) {
					return (
						<div className='courses-container grid-item'>
							<p className='dept-header'>{courseAndDepartment.department_id}</p>
							<ul>
							{
								courseAndDepartment.course_list.map(function(course) {
									return (
										<li>
											<a href={classLink.replace('{{id}}', course.course_id)}
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
				})
			}
			</div>
		);
	}
});


