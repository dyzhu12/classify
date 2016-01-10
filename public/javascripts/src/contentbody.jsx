'use strict';
var React = require('react');
var _ = require('lodash');
var Courses = require('./courses.jsx');
var bridge = require('./comm/bridge');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			courses: [],
			filteredList: []
		};
	},
	searchForClasses: function(e) {
		e.preventDefault();
		var search = e.target.search.value;
		var keywords = search.split(' ').filter(Boolean);
		var self = this;

		bridge.execute('GET', '/data/list', {keywords: keywords}, function(filteredList) {
			self.setState({
				filteredList: filteredList
			});
		});
	},
	componentDidMount: function() {
		bridge.execute('POST', '/data/initialize', null, null, null);
	},
	render: function() {
		return (
			<div>
				<form onSubmit={this.searchForClasses}>
					<div className='header'>
						<div className='title-container'>
							<h1 className='title'>Classify.</h1>
							<p>Find UMD classes</p>
						</div>
					</div>
					<input autoFocus type='text' name='search' placeholder='Search by keyword...'/>
				</form>
				<Courses filteredList={this.state.filteredList}/>
			</div>
		);
	}
});
