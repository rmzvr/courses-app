import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAuthors, addAuthor } from '../services';

const initialState = {
	authors: [],
	status: null,
	error: null,
};

export const getAuthorsAsync = createAsyncThunk(
	'authors/getAuthorsAsync',
	fetchAuthors
);

export const addAuthorAsync = createAsyncThunk(
	'authors/addAuthorAsync',
	addAuthor
);

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {},
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
			})
			.addCase(addAuthorAsync.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(addAuthorAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';

				state.authors.push(action.payload.result);
			})
			.addCase(addAuthorAsync.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export const selectAllAuthors = (state) => state.authors.authors;

export default authorsSlice.reducer;
