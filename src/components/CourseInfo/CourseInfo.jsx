import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import reformatDate from '../../helpers/dateGeneratop';
import timeConvert from '../../helpers/pipeDuration';
import './CourseInfo.css';

function CourseInfo({ courses, authors }) {
	const params = useParams();
	const navigate = useNavigate();
	const { courseId } = params;

	const [course, setCourse] = useState({});
	const [authorsNames, setAuthorsNames] = useState([]);

	const getAuthors = useCallback(() => {
		if (!course?.authors) return [];

		course.authors.forEach((authorId) => {
			const author = authors.find((author) => author.id === authorId);

			setAuthorsNames((prev) => [...prev, author.name]);
		});
	}, [authors, course]);

	useEffect(() => {
		const course = courses.find((course) => course.id === courseId);

		setCourse((prev) => course);

		getAuthors();
	}, [courses, courseId, getAuthors]);

	return (
		<section className='course'>
			<button onClick={() => navigate(-1)}>Back to courses</button>

			<h1 className='course__title'>{course.title}</h1>

			<div className='course__wrapper'>
				<p className='description'>{course.description}</p>

				<div className='info'>
					<ul className='details'>
						<li className='detail'>
							<span className='detail__title'>ID:</span>

							<span className='detail__content detail__content-id'>
								{course.id}
							</span>
						</li>

						<li className='detail'>
							<span className='detail__title'>Duration:</span>

							<span className='detail__content'>
								{timeConvert(course.duration)} hours
							</span>
						</li>

						<li className='detail'>
							<span className='detail__title'>Created:</span>

							<span className='detail__content'>
								{reformatDate(course.creationDate)}
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
