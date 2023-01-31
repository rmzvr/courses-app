import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, logoutUser } from '../services';

const initialState = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
		role: '',
	},
	status: null,
	error: null,
};

export const logoutUserAsync = createAsyncThunk(
	'user/logoutUserAsync',
	logoutUser
);

export const getUserAsync = createAsyncThunk(
	'user/getUserAsync',
	getCurrentUser
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		saveUser: (state, action) => {
			localStorage.setItem('jwt', action.payload.token);

			const user = action.payload;

			state.user = user;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(logoutUserAsync.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(logoutUserAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';

				localStorage.clear();

				state.user = {
					isAuth: false,
					name: '',
					email: '',
					token: '',
					role: '',
				};
			})
			.addCase(logoutUserAsync.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})
			.addCase(getUserAsync.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getUserAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';

				state.user = {
					...action.payload.result,
					isAuth: true,
				};
			})
			.addCase(getUserAsync.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export const selectUser = (state) => state.user.user;

export const selectToken = (state) => state.user.user.token;

export const selectIsAuth = (state) => state.user.user.isAuth;

export const selectRole = (state) => state.user.user.role;

export const { saveUser } = userSlice.actions;

export default userSlice.reducer;
