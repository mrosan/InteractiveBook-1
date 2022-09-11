import { configureStore, createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
	name: 'bookmarks',
	initialState: {
		bookmarks: []
	},
	reducers: {
		addBookmark: (state, action) => {
			if (!state.bookmarks.map((b) => b.id).includes(action.payload.id)) {
				state.bookmarks.push({
					id: action.payload.id,
					chapterTitle: action.payload.chapterTitle,
					bookTitle: action.payload.bookTitle,
				});
			}
		},
		removeBookmark: (state, action) => {
			state.bookmarks = state.bookmarks.filter((b) => b.id !== action.payload.id);
		},
		clearBookmarks: (state, action) => {
			state.bookmarks = [];
		},
	}
});

export const store = configureStore({
	reducer: {
		bookmarksReducer: bookmarksSlice.reducer
	}
});

export const addBookmark = bookmarksSlice.actions.addBookmark;
export const removeBookmark = bookmarksSlice.actions.removeBookmark;
export const emptyBookmarkStore = bookmarksSlice.actions.clearBookmarks;
export const createUniqueBookmarkID = (bookID, chapterID) => {
	return bookID + "/" + chapterID;
}