import {filterBook} from './Books/BooksFilters';
import {compareBooks} from './Books/BooksComparer';

onmessage = function(e) {

	var books = JSON.parse(e.data.books)
		.filter(b => filterBook(b, e.data.filters));
	if (e.data.sortOptions.sortBy)
		books = books.sort((b1, b2) => {
			var comp = compareBooks(b1, b2, e.data.sortOptions.sortBy);
			return e.data.sortOptions.sortDirection === 'ASC'
				? -comp : comp;
		});

	postMessage(books);
	close();
};
