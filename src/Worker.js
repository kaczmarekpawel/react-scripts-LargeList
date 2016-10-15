import Chance from 'chance';
import BookGenres from './model/Genres';

var chance = Chance();

onmessage = function(e) {
	var books = [];
	for (var i = 1; i <= e.data.booksCount; i++){
		books.push(generateBook(i));
		if (books.length % e.data.batch == 0 || books.length == e.data.booksCount) {
			postMessage(books);
			books = [];
		}
	}
};

function generateAuthor() {
	return {
		name: chance.name(),
		gender: chance.gender()
	}
}

function generateBook(id) {
	return {
		id: id,
		name: getRandomTitle(),
		genre: getRandomGenre(),
		publishDate: new Date(chance.date({year: getNumberBetween(1800, 2015)})),
		author: generateAuthor()
	}
}

function getNumberBetween(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomGenre() {
	return BookGenres[Math.floor(Math.random()*BookGenres.length)]
}

function getRandomTitle() {
	return chance.sentence({words: getNumberBetween(2,8)});
}

