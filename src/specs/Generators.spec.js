/**
 * Created by catchor on 2016-10-21.
 */

import Generators from '../Generator/Generators';
import BooksGenres from '../Books/BooksGenres';

describe('Generators specs', () => {
	var book = Generators.generateBook(1);

	function testBookStringField(fieldValue) {
		expect(fieldValue).toBeDefined();
		expect(typeof fieldValue).toEqual('string');
		expect(fieldValue.length).toBeGreaterThan(2);
	}

	it('generating book should return a new book object', () => {
		expect(book.id).toEqual(1);
		expect(book.name).toBeDefined();
		expect(book.genre).toBeDefined();
		expect(book.author).toBeDefined();
		expect(book.publishDate).toBeDefined();
	});

	it('new book object should contain author object', () => {
		expect(typeof book.author).toEqual('object');
		expect(book.author.name).toBeDefined();
		testBookStringField(book.author.name);
		testBookStringField(book.author.gender);
		expect(book.author.gender === ('Male' || 'Female')).toBeTruthy()
	});

	it('generating title should return random title', () => {
		testBookStringField(Generators.generateTitle());
	});

	it('generating genre should return random genre from Genres list', () => {
		testBookStringField(Generators.generateGenre());
		expect(BooksGenres.find(g => g === book.genre)).toBeDefined();
	});

	it('generating genre should return random genre', () => {
		testBookStringField(Generators.generateGenre());
	});

});
