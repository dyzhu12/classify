'use strict';
var React = require('react');
var ContentBody = require('./contentbody.jsx');
var App = React.createClass({
	render: function() {
		return (
			<div>
				<ContentBody/>
				<div className='attribution'>
					<p>Powered by:</p>
					<a target='_blank' href='http://umd.io'>
						<div className='attribution-logo'></div>
					</a>
				</div>
			</div>
		);
	}
});

React.render(<App/>, document.getElementById('entry'));
