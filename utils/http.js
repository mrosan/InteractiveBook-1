import axios from 'axios';

const BACKEND_URL = 'https://interactive-book-c66c0-default-rtdb.europe-west1.firebasedatabase.app/';

export async function fetchBooks() {
	const response = await axios.get(BACKEND_URL + 'BookIDs.json');
	if (response.data === undefined)
		return false;

	let result = [];
	for (let key in response.data) {
		const item = {
			bookID: response.data[key].bookID,
			title: response.data[key].title,
			subtitle: response.data[key].subtitle,
			cover: response.data[key].cover
		};
		result.push(item);
	}

	return result;
}

/*
export async function fetchBooks() {
	let response = await axios.get(BACKEND_URL + 'Books.json');
	if (response?.data === undefined)
		return response; // TODO error handling

	let books = [];
	// Parse books:
	for (let key in response.data) {
		let book = Object.assign({ id: key }, response.data);
		let chapters = [];
		// Parse chapters:
		for (let k in book.Chapters) {
			chapters.push(book.Chapters[k]);
		}
		book.Chapters = chapters;
		// Parse genres:
		book.genre = book.genre.split(",");
		books.push(book);
	}
	return books;
}

export async function fetchAnnotations() {
	const response = await axios.get(BACKEND_URL + 'Annotations.json');
	return response.data;
}
*/


async function fetchBook(id) {
	let response = await axios.get(BACKEND_URL + 'Books/' + id + '.json');
	if (response.data === undefined)
		return false;
	const chaps = [];
	for (let key in response.data.Chapters) {
		if (response.data.Chapters[key])
			chaps.push(response.data.Chapters[key]);
	}
	response.data.genre = response.data.genre.split(",");
	response.data.Chapters = chaps;
	return Object.assign({ id: id }, response.data);
}

async function fetchAnnotation(id) {
	const response = await axios.get(BACKEND_URL + 'Annotations/' + id + '.json');
	return response.data;
}

export async function fetchBookWithAnnotation(id) {
	const b = await fetchBook(id);
	const an = b ? await fetchAnnotation(b.annotation) : false;
	return { book: b, annotations: an };
}
