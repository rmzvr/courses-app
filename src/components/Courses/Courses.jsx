import React, { useEffect, useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './Courses.css';

function Courses({ courses, setCourses, authors }) {
	const [searchValue, setSearchValue] = useState('');
	const [filteredCourses, setFilteredCourses] = useState([...courses]);

	useEffect(() => {
		if (searchValue === '') {
			setFilteredCourses((prev) => courses);
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
		setFilteredCourses((prev) =>
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
			{filteredCourses.map((course) => (
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
