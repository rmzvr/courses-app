import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	courses: [],
	status: null,
	error: null,
};

export const getCoursesAsync = createAsyncThunk(
	'courses/getCoursesAsync',
	async () => {
		const response = await fetch('http://localhost:4000/courses/all');

		if (response.ok) {
			return await response.json();
		}
	}
);

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		addCourse: (state, action) => {
			const course = action.payload;

			state.courses.push(course);
		},
		deleteCourse: (state, action) => {
			const courseId = action.payload;

			return state.courses.filter((course) => course.id !== courseId);
		},
	},
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
			});
	},
});

export const selectAllCourses = (state) => state.courses.courses;

export const { addCourse, deleteCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
