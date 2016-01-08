'use strict';
var React = require('react');
var _ = require('lodash');
var $ = require('jquery');

var Courses = require('./courses.jsx');


module.exports = React.createClass({
	getInitialState: function() {
		return {
			courses: [],
			keywords: []
		};
	},
	searchForClasses: function(e) {
		e.preventDefault();
		var search = e.target.search.value;
		console.log('Search type', search)

		// Delimit by spaces and commas
		var delimitSpaces = search.split(' ');

		var searchTerms = delimitSpaces;
		console.log('Search terms', searchTerms);
		this.setState({keywords: searchTerms.filter(Boolean)});

	},
	showError: function() {
		console.log('Sorry!');
	},
	updateCourses: function(courses) {
		this.setState({courses: courses});
	},
	componentDidMount: function() {
		$.ajax({
			url:'http://api.umd.io/v0/courses/list',
			method: 'GET',
			success: this.updateCourses,
			failure: this.showError
		})
	},
	render: function() {
		return (
			<div>
				<form onSubmit={this.searchForClasses}>
					<input type='text' name='search' placeholder='Search by keyword...'/>
				</form>
				<Courses courseList={this.state.courses} keywords={this.state.keywords}/>
			</div>
		);
	}
});
