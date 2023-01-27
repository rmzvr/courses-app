import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './authorsSlice';
import coursesReducer from './coursesSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		authors: authorsReducer,
		users: userReducer,
	},
});
