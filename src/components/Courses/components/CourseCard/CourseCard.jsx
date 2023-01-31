import React from 'react';
import reformatDate from '../../../../helpers/dateGeneratop';
import timeConvert from '../../../../helpers/pipeDuration';
import styles from './CourseCard.module.css';
import Button from '../../../../common/Button/Button';
import { BUTTON_SHOW_COURSE } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import pencil from '../../../../assets/pencil.svg';
import trash from '../../../../assets/trash.svg';
import { useRole } from '../../../../hooks/useRole';
import { deleteCourseAsync } from '../../../../store/coursesSlice';

function CourseCard({ course, authors }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isAdminRole = useRole();

	function getAuthors() {
		return course.authors.map((authorId) => {
			const author = authors.find((author) => author.id === authorId);

			return author?.name;
		});
	}

	function deleteCourse(id) {
		dispatch(deleteCourseAsync(id));
	}

	function navigateToUpdateCourseForm(id) {
		navigate(`update/${id}`);
	}

	function navigateToCourse(id) {
		navigate(id);
	}

	return (
		<article className={styles['course-card']}>
			<div className={styles['course-card__description']}>
				<h2 className={styles['title']}>{course.title}</h2>

				<p className={styles['description']}>{course.description}</p>
			</div>

			<div className={styles['course-card__info']}>
				<ul className={styles['details']}>
					<li className={styles['detail']}>
						<span className={styles['detail__title']}>Authors:</span>

						<span className={styles['detail__content']}>
							{getAuthors().join(', ')}
						</span>
					</li>

					<li className={styles['detail']}>
						<span className={styles['detail__title']}>Duration:</span>

						<span className={styles['detail__content']}>
							{timeConvert(course.duration)} hours
						</span>
					</li>

					<li className={styles['detail']}>
						<span className={styles['detail__title']}>Created:</span>

						<span className={styles['detail__content']}>
							{reformatDate(course.creationDate)}
						</span>
					</li>
				</ul>

				<div className={styles['course-card__button-container']}>
					<Button onClick={() => navigateToCourse(course.id)}>
						{BUTTON_SHOW_COURSE}
					</Button>

					{isAdminRole && (
						<>
							<Button
								form='squared'
								onClick={() => navigateToUpdateCourseForm(course.id)}
							>
								<img src={pencil} alt='edit icon' width='17' />
							</Button>

							<Button form='squared' onClick={() => deleteCourse(course.id)}>
								<img src={trash} alt='delete icon' width='17' />
							</Button>
						</>
					)}
				</div>
			</div>
		</article>
	);
}

export default CourseCard;
