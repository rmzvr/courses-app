import React from 'react';
import reformatDate from '../../../../helpers/dateGeneratop';
import timeConvert from '../../../../helpers/pipeDuration';
import './CourseCard.css';
import Button from '../../../../common/Button/Button';
import { BUTTON_SHOW_COURSE } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import pencil from '../../../../assets/pencil.svg';
import trash from '../../../../assets/trash.svg';
import { deleteCourse } from '../../../../store/coursesSlice';

function CourseCard({ course, authors }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function getAuthors() {
		return course.authors.map((authorId) => {
			const author = authors.find((author) => author.id === authorId);

			return author?.name;
		});
	}

	function handleDeleteCourse(id) {
		dispatch(deleteCourse(id));
	}

	function navigateToCourse(id) {
		navigate(id);
	}

	return (
		<article className='course-card'>
			<div className='course-card__description'>
				<h2 className='title'>{course.title}</h2>

				<p className='description'>{course.description}</p>
			</div>

			<div className='course-card__info'>
				<ul className='details'>
					<li className='detail'>
						<span className='detail__title'>Authors:</span>

						<span className='detail__content'>{getAuthors().join(', ')}</span>
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
				</ul>

				<div className='course-card__button-container'>
					<Button onClick={() => navigateToCourse(course.id)}>
						{BUTTON_SHOW_COURSE}
					</Button>

					<Button form='squared'>
						<img src={pencil} alt='edit icon' width='17' />
					</Button>

					<Button form='squared' onClick={() => handleDeleteCourse(course.id)}>
						<img src={trash} alt='delete icon' width='17' />
					</Button>
				</div>
			</div>
		</article>
	);
}

export default CourseCard;
