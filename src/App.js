import React from 'react';
import Generator from './Generator/Generator';
import AppProgressBar from './ProgressBar';
import BooksManager from './BooksManager';

import './Utils';

var totalBooks = 100000;

export default React.createClass({
	componentWillMount: function() {
		Generator.generateBooks(totalBooks);
		Generator.registerUpdateHandler(
			({loaded, progress}) => this.setState({loaded, progress})
		);
	},

	getInitialState: function() {
		return {
			loaded: 0,
			progress: 0
		};
	},

	
	render: function() {

		return (
			<div>
				<AppProgressBar
					progress={this.state.progress}
					loaded={this.state.loaded}
					total={totalBooks}/>
				<BooksManager
					books={this.state.progress}/>
			</div>
		)
	}
});
