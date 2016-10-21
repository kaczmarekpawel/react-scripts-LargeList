/**
 * Created by trener on 21.10.16.
 */
import BooksFilters from '../Books/BooksFilters';

describe('BooksFilters', () => {

    var book =  {
        id: 1,
        name: 'Special finance specs',
        genre: 'Finance',
        publishDate: (new Date(2016,9,28)).toString(),
        author: {
            name: 'John Doe',
            gender: 'Male'
        }
    };
    var financeBook = book;
    var horrorBook = {
        id: 4,
        name: 'PHP Horrors',
        genre: 'Horror',
        publishDate: (new Date(2015,9,31)).toString(),
        author: {
            name: 'John Malkovich',
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
        expect(BooksFilters.filterBookTitle(book,'Special')).toBeTruthy();
        expect(BooksFilters.filterBookTitle(book,'special')).toBeTruthy();
        expect(BooksFilters.filterBookTitle(book,'spec')).toBeTruthy();
    });

    it ('should allow filtering book with multiple filters', () => {
        expect(BooksFilters.filterBook(book)).toBeTruthy();

        expect(BooksFilters.filterBook(book, {
            filterBookTitle: 'special',
            filterBookGenre: 'Finance',
            filterAuthorName: 'John',
            filterAuthorGender: 'male'
        })).toBeTruthy();

        expect(BooksFilters.filterBook(book, {
            filterBookTitle: 'special',
            filterBookGenre: 'Finance',
            filterAuthorName: 'Jennifer',
            filterAuthorGender: 'male'
        })).toBeFalsy();
    });

    it ('should allow filtering horror books written on 31. October', () => {
        expect(BooksFilters.isHalloweenBook(horrorBook)).toBeTruthy();
        expect(BooksFilters.isHalloweenBook(book)).toBeFalsy();
    });

    it ('should allow filtering finance books written on last friday of any month', () => {
        expect(BooksFilters.isFridayFinanceBook(financeBook)).toBeTruthy();
        expect(BooksFilters.isFridayFinanceBook(horrorBook)).toBeFalsy();
    })
});
