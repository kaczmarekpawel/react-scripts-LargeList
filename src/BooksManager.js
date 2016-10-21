import React from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap'
import _ from 'lodash';
import Genres from './Books/BooksGenres'
import BooksList from './BooksList';
import Generator from './Generator/Generator';
import Books from './Books/Books';

import Worker from 'worker?inline!./BooksManagerWorker.js';


var worker = new Worker();

export default React.createClass({

	componentWillMount: function() {
		Generator.registerUpdateHandler(({progress}) => {
			if (progress === 100)
				this.fetchBooks();
		});

		this.updateFilter = _.debounce(this.updateFilter, 300);
	},


	getInitialState: function () {
		return {
			books: [],
			filters: {},
			sortOptions: {},
			filteredBooks: [],
			processing: false
		}
	},


	updateFilter: function(name, value) {
		var filters = JSON.parse(JSON.stringify(this.state.filters));
		filters[name] = value;

		this.fetchBooks(filters, this.state.sortOptions);
	},


	updateSortOptions: function(options) {
		this.fetchBooks(this.state.filters, options);
	},

	fetchBooks: function(filters, sortOptions) {
		filters = filters || this.state.filters;
		sortOptions = sortOptions || this.state.sortOptions;

		this.setState({
			processing: true,
			filters: filters,
			sortOptions: sortOptions
		});

		worker.terminate();
		worker = new Worker();
		worker.onmessage = (e) => {
			this.setState({
				books: e.data,
				processing: false
			})
		};

		worker.postMessage({
			filters: filters,
			sortOptions: sortOptions,
			books: Books.getJSON()
		});
	},

	render: function () {


		return (
			<div>
				<Form inline onSubmit={e => e.preventDefault()}>
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
							{Genres.map(function (genre, i) {
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
					books={this.state.books}
					sortOptions={this.state.sortOptions}
					updateSortOptions={this.updateSortOptions}
					processing={this.state.processing}/>

			</div>
		)
	}
});

