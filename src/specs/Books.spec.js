/**
 * Created by catchor on 2016-10-21.
 */
import Books from '../Books/Books';

describe('Books', () => {
	var booksBatch = [{}, {}, {}];

	beforeEach(() => {
		Books.clear();
	});

	it ('should allow to clear the books collection', () => {
		Books.appendBatch(booksBatch);
		Books.clear();
		expect(Books.getBooks().length).toEqual(0);
	});

	it ('should allow to return books array', () => {
		expect(Array.isArray(Books.getBooks())).toBeTruthy();
	});

	it('should allow adding books batches', () => {
		Books.appendBatch(booksBatch);
		expect(Books.getBooks().length).toEqual(3);
	});

	it('should stack added batch with existing books', () => {
		Books.appendBatch(booksBatch);
		Books.appendBatch(booksBatch);
		expect(Books.getBooks().length).toEqual(6);
	});

	it('should return all added books array in JSON format', () => {
		Books.appendBatch(booksBatch);
		Books.appendBatch(booksBatch);
		var books = JSON.parse(Books.getJSON());
		expect(Array.isArray(books)).toBeTruthy();
		expect(books.length).toEqual(6);
	});

});