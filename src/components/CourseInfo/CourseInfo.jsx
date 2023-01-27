import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import reformatDate from '../../helpers/dateGeneratop';
import timeConvert from '../../helpers/pipeDuration';
import { getAuthorsAsync, selectAllAuthors } from '../../store/authorsSlice';
import { getCoursesAsync, selectAllCourses } from '../../store/coursesSlice';
import './CourseInfo.css';

function CourseInfo() {
	const { courseId } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const courses = useSelector(selectAllCourses);
	const authors = useSelector(selectAllAuthors);

	useEffect(() => {
		if (courses?.length || authors?.length) return;

		dispatch(getCoursesAsync());
		dispatch(getAuthorsAsync());
	}, [courses, authors, dispatch]);

	const [course, setCourse] = useState({});
	const [authorsNames, setAuthorsNames] = useState([]);

	const getAuthors = useCallback(() => {
		setAuthorsNames([]);

		course?.authors?.forEach((authorId) => {
			const author = authors.find((author) => author.id === authorId);

			setAuthorsNames((prev) => [...prev, author?.name]);
		});
	}, [authors, course]);

	useEffect(() => {
		getAuthors();
	}, [getAuthors]);

	useEffect(() => {
		const course = courses.find((course) => course.id === courseId);

		setCourse(() => course);
	}, [courses, courseId]);

	return (
		<section className='course'>
			<button onClick={() => navigate(-1)}>Back to courses</button>

			<h1 className='course__title'>{course?.title}</h1>

			<div className='course__wrapper'>
				<p className='description'>{course?.description}</p>

				<div className='info'>
					<ul className='details'>
						<li className='detail'>
							<span className='detail__title'>ID:</span>

							<span className='detail__content detail__content-id'>
								{course?.id}
							</span>
						</li>

						<li className='detail'>
							<span className='detail__title'>Duration:</span>

							<span className='detail__content'>
								{timeConvert(course?.duration)} hours
							</span>
						</li>

						<li className='detail'>
							<span className='detail__title'>Created:</span>

							<span className='detail__content'>
								{reformatDate(course?.creationDate)}
							</span>
						</li>

						<li className='detail detail-authors'>
							<span className='detail__title'>Authors:</span>
							<ul className='detail-authors-wrapper'>
								{authorsNames.map((author, index) => (
									<li key={`${author}${index}`}>{author}</li>
								))}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}

export default CourseInfo;
