import React from 'react';
import {Table, Column, AutoSizer} from 'react-virtualized'
import TableStyles from 'react-virtualized/styles.css';
import './styles/booksList.css';
import {resolveObjectFieldValue} from './Utils'

import BookFilters from './Books/BooksFilters';


export default React.createClass({

	getInitialState: function () {
		return {
			sortBy: '',
			sortDirection: undefined
		};
	},

	render: function () {

		function rowGetter(param) {
			return this.props.books[param.index];
		}

		return (
			<AutoSizer disableHeight>
				{({ width }) => (
					<div style={{position: 'absolute'}}>
						<div onClick={e => {e.stopPropagation()}} className={this.props.processing ? 'loading-mask active': 'loading-mask'}/>
						<Table
							disableHeader={false}
							headerClassName={TableStyles.headerColumn}
							headerHeight={60}
							height={600}
							width={window.innerWidth}
							rowHeight={30}
							rowCount={this.props.books.length}
							rowGetter={rowGetter.bind(this)}
							rowClassName={({index}) => this._getRowClassName(this.props.books[index])}
							sort={this.props.updateSortOptions}
							sortBy={this.props.sortOptions.sortBy}
							sortDirection={this.props.sortOptions.sortDirection}>
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
						<div>{this.props.books.length} books found</div>
					</div>
				)}
			</AutoSizer>
		)
	},

	_customCellDataGetter: function(columnData) {
		return resolveObjectFieldValue(columnData.rowData, columnData.dataKey);
	},


	_getRowClassName: function(book) {
		if (!book) return;

		if (BookFilters.isFridayFinanceBook(book)) return 'finance-rampage';
		else if (BookFilters.isHalloweenBook(book)) return 'halloween-book'
	}
});

