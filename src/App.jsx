import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from './mocks';
import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	return (
		<div className='container'>
			<Header />
			<Routes>
				<Route
					path='/'
					element={
						localStorage.getItem('jwt') ? (
							<Navigate to='/courses' />
						) : (
							<Navigate to='/login' />
						)
					}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/courses'
					element={
						<Courses
							authors={authors}
							courses={courses}
							setCourses={setCourses}
						/>
					}
				/>
				<Route
					path='/courses/:courseId'
					element={<CourseInfo courses={courses} authors={authors} />}
				/>
				<Route
					path='/courses/add'
					element={
						<CreateCourse
							authors={authors}
							setAuthors={setAuthors}
							setCourses={setCourses}
						/>
					}
				/>
			</Routes>
		</div>
	);
}
export default App;
