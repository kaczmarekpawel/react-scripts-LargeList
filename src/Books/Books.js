export default (function() {
	var books = '[]';
	var batches = [];

	return {
		appendBatch: function (batch) {
			batches.push(batch);
			var batchString = JSON.stringify(batch);

			books = books === '[]'
				? batchString
				: '[' + books.slice(1, books.length - 1) + ','
					+ batchString.slice(1, batchString.length - 1) + ']';
		},
		getBooks: () => JSON.parse(books),
		getJSON: () => books,
		clear: () => {
			books = '[]';
			batches = [];
		}
	}
})();
