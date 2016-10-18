import React from 'react';
import Genres from './model/Genres'
import BooksList from './BooksList';
import {BookCheckers} from './model/Books'
import {Form, FormGroup, FormControl, Checkbox} from 'react-bootstrap'


export default React.createClass({

	getInitialState: function () {
		return {
			filters: {}
		}
	},

	filterAuthorGender: function(book) {
		return book.author.gender === this.state.filters.filterAuthorGender;
	} ,
	filterAuthorName: function(book) {
		return book.author.name.indexOf(this.state.filters.filterAuthorName) !== -1;
	},
	filterBookGenre: function(book) {
		return book.genre === this.state.filters.filterBookGenre;
	},
	filterBookType: function(book) {
		return BookCheckers[this.state.filters.filterBookType](book)
	},

	updateFilter: function(name, value) {
		var filters = JSON.parse(JSON.stringify(this.state.filters));
		filters[name] = value;
		this.setState({filters});
	},


	render: function () {

		const filteredBooks = this._isFilterEnabled()
			? this.props.books.filter(this._filterBook)
			: this.props.books;

		return (
			<div>
				<Form inline>
					<FormGroup>
						<FormControl
							type="text"
							data-name="filterAuthorName"
							value={this.state.authorName}
							placeholder="Author name"
							onChange={e => this.updateFilter(e.target.dataset.name, e.target.value)}/>
						<FormControl
							componentClass="select"
							data-name="filterAuthorGender"
							onChange={e => this.updateFilter(e.target.dataset.name, e.target.value)}>
							<option value="">Author gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</FormControl>
						<FormControl
							componentClass="select"
							data-name="filterBookGenre"
							onChange={e => this.updateFilter(e.target.dataset.name, e.target.value)}>
							<option value="">Book genre</option>
							{Genres.sort().map(function (genre, i) {
								return <option key={i} value={genre}>{genre}</option>
							})}
						</FormControl>
						<FormControl
							componentClass="select"
							data-name="filterBookType"
							onChange={e => this.updateFilter(e.target.dataset.name, e.target.value)}>
							<option value="">Special Book Type</option>
							<option value="isHalloweenBook">Halloween Book</option>
							<option value="isFridayFinanceBook">Friday Finance Book</option>
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

	_isFilterEnabled: function () {
		return Object.keys(this.state.filters).some(key => key);
	},

	_filterBook: function(book) {
		return Object.keys(this.state.filters)
			.filter( key => this.state.filters[key] )
			.reduce( (isFiltered, filterName) => isFiltered &= this[filterName](book) , true);
	}
});

