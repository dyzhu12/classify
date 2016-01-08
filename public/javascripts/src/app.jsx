'use strict';

var React = require('react');
var ContentBody = require('./contentbody.jsx');
var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Classify: Powered by umd.io</h1>
				<ContentBody/>
			</div>
		);
	}
});

React.render(<App/>, document.getElementById('entry'));
