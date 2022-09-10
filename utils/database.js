import * as SQLite from 'expo-sqlite'
import { openDatabase } from 'expo-sqlite'

const database = SQLite.openDatabase('bookmarks.db');

export function initDatabase() {
	return new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(`CREATE TABLE IF NOT EXISTS bookmarks (
				id INTEGER PRIMARY KEY NOT NULL,
				bookID INTEGER NOT NULL,
				chapterID INTEGER NOT NULL
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
				`INSERT INTO bookmarks (bookID, chapterID) VALUES (?,?)`,
				[bookmark.bookID, bookmark.chapterID],
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