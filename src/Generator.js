import Worker from 'worker?inline!./Worker.js';
import Books from './model/Books';

var updateHandlers = [];


function fireUpdateHandlers(booksUpdate) {
	updateHandlers.forEach(function(handler) {
		handler(booksUpdate);
	});
}

export default {

	registerUpdateHandler: function(handler) {
		updateHandlers.push(handler);
	},

	generateBooks: function(count) {
		var worker = new Worker();

		worker.onmessage = function(e) {
			Books.loaded = Books.loaded.concat(e.data);
			fireUpdateHandlers({
				books: Books.loaded,
				update: e.data,
				progress: Books.loaded.length * 100 / count
			});
		};

		worker.postMessage({booksCount: count, batch: 5000});
	}
};

