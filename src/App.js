import React from 'react';
import Generator from './Generator';
import AppProgressBar from './ProgressBar';
import BooksManager from './BooksManager';

var totalBooks = 10000;

export default React.createClass({
	componentWillMount: function() {
		Generator.generateBooks(totalBooks);
		Generator.registerUpdateHandler(
			({books, progress}) => this.setState({books, progress})
		);
	},

	getInitialState: function() {
		return {
			progress: 0,
			books: []
		};
	},
	
	render: function() {

		return (
			<div>
				<AppProgressBar
					progress={this.state.progress}
					loaded={this.state.books.length}
					total={totalBooks}/>
				<BooksManager
					books={this.state.books}/>
			</div>
		)
	}
});
