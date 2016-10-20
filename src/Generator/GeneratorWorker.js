import {generateBook} from './Generators'

onmessage = function(e) {
	var books = [];
	for (var i = 1; i <= e.data.booksCount; i++){
		books.push(generateBook(i));
		if (books.length % e.data.batch == 0 || books.length == e.data.booksCount) {
			postMessage({payload: books, processed: i});
			books = [];
		}
	}
};
