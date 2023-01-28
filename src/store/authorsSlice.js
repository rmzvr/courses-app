import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAuthors } from '../services';

const initialState = {
	authors: [],
	status: null,
	error: null,
};

export const getAuthorsAsync = createAsyncThunk(
	'authors/getAuthorsAsync',
	fetchAuthors
);

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		addAuthor: (state, action) => {
			const author = action.payload;

			state.authors.push(author);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAuthorsAsync.pending, (state, action) => {
				state.status = 'loading';
			})

			.addCase(getAuthorsAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';

				state.authors = action.payload.result;
			})
			.addCase(getAuthorsAsync.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export const selectAllAuthors = (state) => state.authors.authors;

export const { addAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;