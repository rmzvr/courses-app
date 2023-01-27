import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
	},
	status: null,
	error: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		saveUser: (state, action) => {
			localStorage.setItem('jwt', action.payload.token);

			const user = action.payload;

			state.user = user;
		},
		logoutUser: (state) => {
			localStorage.clear();

			state.user = {
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		},
	},
});

export const selectUser = (state) => state.user.user;

export const { saveUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
