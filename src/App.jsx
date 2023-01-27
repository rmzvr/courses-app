import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
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
				<Route path='/courses' element={<Courses />} />
				<Route path='/courses/:courseId' element={<CourseInfo />} />
				<Route path='/courses/add' element={<CreateCourse />} />
				<Route path='*' element={<Navigate to='/courses' />} />
			</Routes>
		</div>
	);
}
export default App;
