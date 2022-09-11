import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('bookmarks.db');

export function initDatabase() {
	return new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(`CREATE TABLE IF NOT EXISTS bookmarks (
				id INTEGER PRIMARY KEY NOT NULL,
				bookID TEXT NOT NULL,
				chapterID TEXT NOT NULL,
				bookTitle TEXT NOT NULL,
				chapterTitle TEXT NOT NULL
			)`,
				[],
				() => { resolve(); },
				(_, error) => { reject(error); },
			);
		});
	});
}

export function saveBookmark(bookmark) {
	return new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO bookmarks (bookID, chapterID, bookTitle, chapterTitle) VALUES (?,?,?,?)`,
				[bookmark.bookID, bookmark.chapterID, bookmark.bookTitle, bookmark.chapterTitle],
				(_, result) => { resolve(result); },
				(_, error) => { reject(error); }
			);
		});
	});
}

export function fetchBookmarks() {
	return new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM bookmarks',
				[],
				(_, result) => { resolve(result); },
				(_, error) => { reject(error); }
			);
		});
	});
}

export function clearBookmarks() {
	return new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				'DELETE FROM bookmarks',
				[],
				(_, result) => { resolve(result); },
				(_, error) => { reject(error); }
			);
		});
	});
}