/**
 * Created by catchor on 2016-10-20.
 */

import BookGenres from '../Books/BooksGenres'
import Chance from 'chance'

let chance = Chance();

export const generateBook = (id) => ({
	id: id,
	name: generateTitle(),
	genre: generateGenre(),
	publishDate: chance.date({year: generateNumberBetween(1800, 2015)}),
	author: generateAuthor()
});

export const generateNumberBetween = (min, max) =>  Math.floor(Math.random()*(max-min+1)+min);

export const generateGenre = () => BookGenres[Math.floor(Math.random()*BookGenres.length)];

export const generateTitle = () => chance.sentence({words: generateNumberBetween(2,8)});

export const generateAuthor = () => ({
	name: chance.name(),
	gender: chance.gender()
});

export default {
	generateBook,
	generateGenre,
	generateAuthor,
	generateTitle,
	generateNumberBetween
}
