export default {
	loaded: [],
	total: 0
};


const BookCheckers = {

	isHalloweenBook: function(book) {
		return book.genre === 'Horror'
			&& book.publishDate.getMonth() === 9
			&& book.publishDate.getDate() === 31
	},

	isFridayFinanceBook: function(book) {
		function isLastFriday(){
			var month = book.publishDate.getMonth(),
				tmpDate = new Date(book.publishDate);

			return new Date(tmpDate.setDate(tmpDate.getDate() + 7)).getMonth() !== month;
		}

		return book.genre === 'Finance'
			&& book.publishDate.getDay() === 5
			&& isLastFriday()
	}
};

export { BookCheckers };
