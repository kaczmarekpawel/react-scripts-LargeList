export default (function() {
	var total = 0;
	var books = '';
	var batches = [];

	return {
		appendBatch: function (batch) {
			batches.push(batch);
			total += batch.length;
			var batchString = JSON.stringify(batch);

			books = books
				? '[' + books.slice(1, books.length - 1) + ','
					+ batchString.slice(1, batchString.length - 1) + ']'
				: batchString;
		},
		getJSON: () => books
	}
})();
