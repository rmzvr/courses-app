import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from './mocks';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const [isAddNewCourseFormVisible, setIsAddNewCourseFormVisible] =
		useState(false);

	function toggleFormVisibility() {
		setIsAddNewCourseFormVisible((prev) => !prev);
	}

	return (
		<div className='container'>
			<Header />
			{isAddNewCourseFormVisible ? (
				<CreateCourse
					authors={authors}
					setAuthors={setAuthors}
					setCourses={setCourses}
					handleFormVisibility={toggleFormVisibility}
				/>
			) : (
				<Courses
					authors={authors}
					courses={courses}
					setCourses={setCourses}
					handleFormVisibility={toggleFormVisibility}
				/>
			)}
		</div>
	);
}
export default App;
