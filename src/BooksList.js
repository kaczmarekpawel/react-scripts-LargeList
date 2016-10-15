import React from 'react';
import {Table, Column, SortDirection, AutoSizer} from 'react-virtualized'

import {BookCheckers} from './model/Books';

import TableStyles from 'react-virtualized/styles.css';
import './styles/booksList.css';


function resolveName(object, path) {
	return path.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : undefined;
	}, object || self)
}

export default React.createClass({

	getInitialState: function () {
		return {
			sortBy: '',
			sortDirection: undefined
		};
	},

	render: function () {

		const sortedList = !this.state.sortBy
			? this.props.books
			: this._getSortedBooks(this.props.books);

		function rowGetter(param) {
			return sortedList[param.index];
		}

		return (
			<AutoSizer disableHeight>
				{({ width }) => (
					<Table
						disableHeader={false}
						headerClassName={TableStyles.headerColumn}
						headerHeight={60}
						height={600}
						width={window.innerWidth}
						rowHeight={30}
						rowCount={sortedList.length}
						rowGetter={rowGetter.bind(this)}
						rowClassName={({index}) => this._getRowClassName(sortedList[index])}
						sort={this._sort}
						sortBy={this.state.sortBy}
						sortDirection={this.state.sortDirection}>
						<Column
							label='#'
							dataKey='id'
							width={100}
						/>
						<Column
							label="Genre"
							dataKey="genre"
							width={120}
						/>
						<Column
							label="Gender"
							cellDataGetter={this._customCellDataGetter}
							dataKey="author.gender"
							width={80}
						/>
						<Column
							label="Author"
							cellDataGetter={this._customCellDataGetter}
							dataKey="author.name"
							width={120}
						/>
						<Column
							label='Name'
							dataKey='name'
							width={360}
							flexGrow={1}
						/>
					</Table>
				)}
			</AutoSizer>
		)
	},

	_customCellDataGetter: function(columnData) {
		return resolveName(columnData.rowData, columnData.dataKey);
	},

	_getSortedBooks: function (books) {
		return books.sort(function (b1, b2) {
			var comp = this._compareBooks(b1, b2);
			return this.state.sortDirection === SortDirection.ASC
				? comp : -comp;
		}.bind(this));
	},

	_getRowClassName: function(book) {
		if (!book) return;

		if (BookCheckers.isFridayFinanceBook(book)) return 'finance-rampage';
		else if (BookCheckers.isHalloweenBook(book)) return 'halloween-book'
	},

	_compareBooks: function (b1, b2) {
		var v1 = resolveName(b1, this.state.sortBy),
			v2 = resolveName(b2, this.state.sortBy);

		if (v1 > v2) return -1;
		else if (v1 < v2) return 1;
		else return 0;
	},

	_sort: function (options) {
		this.setState({
			sortBy: options.sortBy,
			sortDirection: options.sortDirection
		});
	}
});

