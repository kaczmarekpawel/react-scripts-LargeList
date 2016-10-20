import Worker from 'worker?inline!./GeneratorWorker.js';
import Books from '../Books/Books';

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
			Books.appendBatch(e.data.payload);

			fireUpdateHandlers({
				update: e.data.payload,
				loaded: e.data.processed,
				progress: e.data.processed * 100 / count
			});
		};

		worker.postMessage({booksCount: count, batch: 5000});
	}
};

