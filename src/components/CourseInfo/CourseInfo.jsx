import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../common/Button/Button';
import reformatDate from '../../helpers/dateGeneratop';
import timeConvert from '../../helpers/pipeDuration';
import { getAuthorsAsync, selectAllAuthors } from '../../store/authorsSlice';
import { getCoursesAsync, selectAllCourses } from '../../store/coursesSlice';
import styles from './CourseInfo.module.css';

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
		<section className={styles['course']}>
			<Button onClick={() => navigate(-1)}>Back to courses</Button>

			<h1 className={styles['course__title']}>{course?.title}</h1>

			<div className={styles['course__wrapper']}>
				<p className={styles['description']}>{course?.description}</p>

				<div className={styles['info']}>
					<ul className={styles['details']}>
						<li className={styles['detail']}>
							<span className={styles['detail__title']}>ID:</span>

							<span
								className={`${styles['detail__content']} ${styles['detail__content-id']}`}
							>
								{course?.id}
							</span>
						</li>

						<li className={styles['detail']}>
							<span className={styles['detail__title']}>Duration:</span>

							<span className={styles['detail__content']}>
								{timeConvert(course?.duration)} hours
							</span>
						</li>

						<li className={styles['detail']}>
							<span className={styles['detail__title']}>Created:</span>

							<span className={styles['detail__content']}>
								{reformatDate(course?.creationDate)}
							</span>
						</li>

						<li className={`${styles['detail']} ${styles['detail-authors']}`}>
							<span className={styles['detail__title']}>Authors:</span>
							<ul className={styles['detail-authors-wrapper']}>
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
