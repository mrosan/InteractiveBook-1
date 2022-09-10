import { configureStore, createSlice } from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
	name: 'bookmarks',
	initialState: {
		ids: []
	},
	reducers: {
		addBookmark: (state, action) => {
			if (!state.ids.includes(action.payload.id)) {
				state.ids.push(action.payload.id);
			}
		},
		removeBookmark: (state, action) => {
			state.ids.splice(state.ids.indexOf(action.payload.id), 1);
		},
		clearBookmarks: (state, action) => {
			state.ids = [];
		},
	}
});

export const store = configureStore({
	reducer: {
		bookmarksR: bookmarksSlice.reducer
	}
});

export const addBookmark = bookmarksSlice.actions.addBookmark;
export const removeBookmark = bookmarksSlice.actions.removeBookmark;
export const emptyBookmarkStore = bookmarksSlice.actions.clearBookmarks;
export const createUniqueBookmarkID = (bookID, chapterID) => {
	return bookID + "/" + chapterID;
}