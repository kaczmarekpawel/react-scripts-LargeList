/**
 * Created by trener on 21.10.16.
 */
import BooksFilters from '../Books/BooksFilters';

describe('BooksFilters', () => {
    var book = {
        id: 1,
        name: 'Super specs book',
        genre: 'Finance',
        publishDate: (new Date()).toString(),
        author: {
            name: 'John Doe',
            gender: 'Male'
        }
    };

    it ('should allow filtering book with author gender', () => {
        expect(BooksFilters.filterAuthorGender(book)).toBeTruthy();
        expect(BooksFilters.filterAuthorGender(book, '')).toBeTruthy();
        expect(BooksFilters.filterAuthorGender(book, 'Male')).toBeTruthy();
        expect(BooksFilters.filterAuthorGender(book, 'Female')).toBeFalsy()
    });

    it ('should allow filtering book with author name', () => {
        expect(BooksFilters.filterAuthorName(book)).toBeTruthy();
        expect(BooksFilters.filterAuthorName(book, '')).toBeTruthy();
        expect(BooksFilters.filterAuthorName(book, 'John')).toBeTruthy();
        expect(BooksFilters.filterAuthorName(book, 'Doe')).toBeTruthy();
        expect(BooksFilters.filterAuthorName(book, 'Mick')).toBeFalsy();
    });

    it ('should allow filtering book with book genre', () => {
        expect(BooksFilters.filterBookGenre(book)).toBeTruthy();
        expect(BooksFilters.filterBookGenre(book, '')).toBeTruthy();
        expect(BooksFilters.filterBookGenre(book, 'Finance')).toBeTruthy();
        expect(BooksFilters.filterBookGenre(book, 'Drama')).toBeFalsy();
    });

    it ('should allow filtering book with book title', () => {
        expect(BooksFilters.filterBookTitle(book)).toBeTruthy();
        expect(BooksFilters.filterBookTitle(book,'')).toBeTruthy();
        expect(BooksFilters.filterBookTitle(book,'Super')).toBeTruthy();
        expect(BooksFilters.filterBookTitle(book,'spec')).toBeTruthy();
    });
})
