import Header from './components/Header/Header';
import styles from './App.module.css';
import Courses from './components/Courses/Courses';
import CourseFrom from './components/CourseFrom/CourseFrom';
import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import AuthRoute from './components/AuthRoute/AuthRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
	return (
		<div className={styles['container']}>
			<Header />
			<Routes>
				<Route element={<AuthRoute />}>
					<Route path='/' element={<Navigate to='/courses' />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />
					<Route path='*' element={<Navigate to='/courses' />} />
					<Route element={<PrivateRoute />}>
						<Route path='/courses/add' element={<CourseFrom />} />
						<Route path='/courses/update/:courseId' element={<CourseFrom />} />
					</Route>
				</Route>
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</div>
	);
}
export default App;
