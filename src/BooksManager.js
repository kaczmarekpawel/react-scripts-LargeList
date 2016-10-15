import React from 'react';
import Genres from './model/Genres'
import BooksList from './BooksList';
import {Form, FormGroup, FormControl} from 'react-bootstrap'


export default React.createClass({

	getInitialState: function () {
		return {
			authorName: '',
			authorGender: null,
			bookGenre: ''
		}
	},

	updateFilter: function (e) {
		var state = {};
		state[e.target.dataset.name] = e.target.value;
		this.setState(state);
	},

	render: function () {

		const filteredBooks = this._isFilterDisabled()
			? this.props.books
			: this.props.books.filter(this._filterBook);

		return (
			<div>
				<Form inline>
					<FormGroup>
						<FormControl
							type="text"
							data-name="authorName"
							value={this.state.authorName}
							placeholder="Author name"
							onChange={this.updateFilter}/>
						<FormControl
							componentClass="select"
							data-name="authorGender"
							onChange={this.updateFilter}>
							<option value="">Author gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</FormControl>
						<FormControl
							componentClass="select"
							data-name="bookGenre"
							onChange={this.updateFilter}>
							<option value="">Book genre</option>
							{Genres.sort().map(function (genre, i) {
								return <option key={i} value={genre}>{genre}</option>
							})}
						</FormControl>
					</FormGroup>
				</Form>
				<BooksList
					books={filteredBooks}
					finished={this.props.finished}/>
				<div>{filteredBooks.length} books found</div>
			</div>
		)
	},

	_isFilterDisabled: function () {
		return !this.state.authorName && !this.state.authorGender && !this.state.bookGenre;
	},

	_filterBook: function(book) {
		var filtered = true;
		if (this.state.authorName)
			filtered &= book.author.name.indexOf(this.state.authorName) !== -1;
		if (this.state.authorGender)
			filtered &= book.author.gender === this.state.authorGender;
		if (this.state.bookGenre)
			filtered &= book.genre === this.state.bookGenre;
		return filtered;
	}
});

