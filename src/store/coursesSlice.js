import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchCourses,
	deleteCourse,
	updateCourse,
	addCourse,
} from '../services';

const initialState = {
	courses: [],
	status: null,
	error: null,
};

export const getCoursesAsync = createAsyncThunk(
	'courses/getCoursesAsync',
	fetchCourses
);

export const addCourseAsync = createAsyncThunk(
	'courses/addCourseAsync',
	addCourse
);

export const updateCourseAsync = createAsyncThunk(
	'courses/updateCourseAsync',
	updateCourse
);

export const deleteCourseAsync = createAsyncThunk(
	'courses/deleteCourseAsync',
	deleteCourse
);

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCoursesAsync.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getCoursesAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';

				state.courses = action.payload.result;
			})
			.addCase(getCoursesAsync.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})

			.addCase(addCourseAsync.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(addCourseAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';

				const { result } = action.payload;

				state.courses.push(result);
			})
			.addCase(addCourseAsync.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})

			.addCase(updateCourseAsync.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(updateCourseAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';

				const course = action.payload;

				state.courses = state.courses.map((c) => {
					if (c.id === course.id) {
						return course;
					} else {
						return c;
					}
				});
			})
			.addCase(updateCourseAsync.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})

			.addCase(deleteCourseAsync.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(deleteCourseAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';

				const courseId = action.payload;

				state.courses = state.courses.filter(
					(course) => course.id !== courseId
				);
			})
			.addCase(deleteCourseAsync.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			});
	},
});

export const selectAllCourses = (state) => state.courses.courses;

export const selectCourseById = (state, courseId) =>
	state.courses.courses.find((course) => course.id === courseId);

export default coursesSlice.reducer;
