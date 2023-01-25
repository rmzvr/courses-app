import React from 'react';
import reformatDate from '../../../../helpers/dateGeneratop';
import timeConvert from '../../../../helpers/pipeDuration';
import './CourseCard.css';
import Button from '../../../../common/Button/Button';
import { BUTTON_SHOW_COURSE } from '../../../../constants';

function CourseCard({ course, authors }) {
	function getAuthors() {
		return course.authors.map((authorId) => {
			const author = authors.find((author) => author.id === authorId);

			return author.name;
		});
	}

	return (
		<article className='course'>
			<div className='course__description'>
				<h2 className='title'>{course.title}</h2>

				<p className='description'>{course.description}</p>
			</div>

			<div className='course__info'>
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

				<div className='course__button-container'>
					<Button>{BUTTON_SHOW_COURSE}</Button>
				</div>
			</div>
		</article>
	);
}

export default CourseCard;
