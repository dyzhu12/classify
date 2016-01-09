'use strict';
var React = require('react');
var bridge = require('./comm/bridge');

module.exports = React.createClass({

	render: function() {

		return (
			<div className='container'>
				<ul>
				{
					this.props.filteredList.map(function(entry) {
						return (
							<li>
								<a>{entry.id}: <span>{entry.name}</span></a>
							</li>
						);
					})
				}
				</ul>
			</div>
		);
	}
});
