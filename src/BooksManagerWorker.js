import BookFilters from './Books/BooksFilters';

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

function filterBook(book, activeFilters) {
	return Object.keys(BookFilters)
		.filter( key => activeFilters[key] )
		.reduce( (isFiltered, filterName) =>
			isFiltered && BookFilters[filterName](book, activeFilters[filterName]) , true);
}

function compareBooks (b1, b2, sortBy) {
	var v1 = resolveObjectFieldValue(b1, sortBy),
		v2 = resolveObjectFieldValue(b2, sortBy);

	if (v1 > v2) return -1;
	else if (v1 < v2) return 1;
	else return 0;
}

function resolveObjectFieldValue(object, fieldName) {
	return fieldName.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : undefined;
	}, object || self)
}
