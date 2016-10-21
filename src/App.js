import React from 'react';
import Generator from './Generator/Generator';
import AppProgressBar from './ProgressBar';
import BooksManager from './BooksManager';
import WelcomeDialog from './WelcomeModal';

import './Utils';

export default React.createClass({

	getInitialState: function(){
		return { loaded: 0, progress: 0 };
	},

	start: function(bookCount) {
		this.setState({total: bookCount});
		Generator.generateBooks(bookCount);
		Generator.registerUpdateHandler(
			({loaded, progress}) => this.setState({loaded, progress})
		);
	},

	render: function() {
		return (
			<div>
				<WelcomeDialog start={this.start}/>
				<AppProgressBar
					progress={this.state.progress}
					loaded={this.state.loaded}
					total={this.state.total}/>
				<BooksManager
					books={this.state.progress}/>
			</div>
		)
	}
});
