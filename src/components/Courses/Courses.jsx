import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorsAsync, selectAllAuthors } from '../../store/authorsSlice';
import { getCoursesAsync, selectAllCourses } from '../../store/coursesSlice';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './Courses.css';

function Courses() {
	const dispatch = useDispatch();
	const authors = useSelector(selectAllAuthors);

	useEffect(() => {
		if (authors.length) return;

		dispatch(getAuthorsAsync());
	}, [authors, dispatch]);

	const courses = useSelector(selectAllCourses);
	const [filteredCourses, setFilteredCourses] = useState(courses);

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (courses?.length) return;

		dispatch(getCoursesAsync());
	}, [courses, dispatch]);

	useEffect(() => {
		if (!searchValue) {
			setFilteredCourses(() => courses);
		}
	}, [searchValue, courses]);

	function handleSubmit(event) {
		event.preventDefault();

		filterCourses();
	}

	function handleChange(event) {
		setSearchValue(event.target.value);
	}

	function filterCourses() {
		setFilteredCourses(() =>
			filteredCourses.filter((course) =>
				course.title.toLowerCase().includes(searchValue.toLowerCase())
			)
		);
	}

	return (
		<div className='courses'>
			<SearchBar
				value={searchValue}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			{filteredCourses?.length &&
				filteredCourses.map((course) => (
					<CourseCard
						course={course}
						authors={authors}
						key={course.id}
					></CourseCard>
				))}
		</div>
	);
}

export default Courses;
