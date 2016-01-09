'use strict';
var React = require('react');
var bridge = require('./comm/bridge');
var classLink = 'https://ntst.umd.edu/soc/search?courseId={{id}}&sectionId=&termId=201601&_openSectionsOnly=on&courseLevelFilter=ALL&instructor=&teachingCenter=ALL&courseStartCompare=&courseStartHour=&courseStartMin=&courseStartAM='

module.exports = React.createClass({

	render: function() {

		return (
			<div className='container'>
				<ul>
				{
					this.props.filteredList.map(function(entry) {
						return (
							<li>
								<a className='class-entry' target='_blank'
								href={classLink.replace('{{id}}', entry.id)}>
									{entry.id}: <span>{entry.name}</span>
								</a>
							</li>
						);
					})
				}
				</ul>
			</div>
		);
	}
});


