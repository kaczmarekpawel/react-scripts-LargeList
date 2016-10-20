/**
 * Created by catchor on 2016-10-20.
 */

import BookFilters from './BooksFilters';

export const filterAuthorGender = (book, gender) => book.author.gender === gender;

export const filterAuthorName = (book, name) => book.author.name.indexOf(name) !== -1;

export const filterBookGenre = (book, genre) => book.genre === genre;

export const filterBookType = (book, typeChecker) => BookFilters[typeChecker](book);

export const isHalloweenBook = (book) => {
	var pd = new Date(book.publishDate);
	return book.genre === 'Horror'
		&& pd.getMonth() === 9
		&& pd.getDate() === 31
};


export const isFridayFinanceBook = (book) => {
	var pd = new Date(book.publishDate);
	function isLastFriday(){
		var month = pd.getMonth(),
			tmpDate = new Date(pd);

		return new Date(tmpDate.setDate(tmpDate.getDate() + 7)).getMonth() !== month;
	}

	return book.genre === 'Finance'
		&& pd.getDay() === 5
		&& isLastFriday()
};

export default {
	filterAuthorGender,
	filterAuthorName,
	filterBookGenre,
	filterBookType,
	isHalloweenBook,
	isFridayFinanceBook
}