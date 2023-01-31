import React, { useEffect, useState } from 'react';
import styles from './CourseFrom.module.css';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import Button from '../../common/Button/Button';
import {
	BUTTON_ADD_AUTHOR,
	BUTTON_CREATE_AUTHOR,
	BUTTON_CREATE_COURSE,
	BUTTON_DELETE_AUTHOR,
	BUTTON_UPDATE_COURSE,
} from '../../constants';
import timeConvert from '../../helpers/pipeDuration';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	addCourseAsync,
	selectCourseById,
	updateCourseAsync,
} from '../../store/coursesSlice';
import { addAuthorAsync, selectAllAuthors } from '../../store/authorsSlice';

function CourseFrom() {
	const navigate = useNavigate();
	const location = useLocation();
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const authors = useSelector(selectAllAuthors);

	const course = useSelector((state) => selectCourseById(state, courseId));

	const isUpdateCoursePage = location.pathname.includes('update');

	const [fields, setFields] = useState({
		title: '',
		description: '',
		duration: '',
		author: '',
	});

	useEffect(() => {
		setAvailableAuthors(authors);
	}, [authors]);

	const [availableAuthors, setAvailableAuthors] = useState(
		isUpdateCoursePage ? getAvailableAuthors() : authors
	);

	const [selectedAuthors, setSelectedAuthors] = useState(
		isUpdateCoursePage ? getSelectedAuthors() : []
	);

	function getAvailableAuthors() {
		return authors.filter((availableAuthor) => {
			const courseAuthor = course.authors.find(
				(author) => availableAuthor.id === author
			);

			return !courseAuthor;
		});
	}

	function getSelectedAuthors() {
		return authors.filter((availableAuthor) => {
			const courseAuthor = course.authors.find(
				(author) => availableAuthor.id === author
			);

			return courseAuthor;
		});
	}

	function updateField(event) {
		const name = event.target.name;
		const value = event.target.value;
		setFields((values) => ({ ...values, [name]: value }));
	}

	function updateDurationField(event) {
		setFields((prev) => ({
			...prev,
			duration: event.target.validity.valid
				? event.target.value
				: prev.duration,
		}));
	}

	function addNewAuthor() {
		const newAuthor = { name: fields.author };

		dispatch(addAuthorAsync(newAuthor));

		clearAuthorField();
	}

	function addAuthorToCourse(author) {
		setAvailableAuthors((prev) => prev.filter((a) => a.id !== author.id));
		setSelectedAuthors((prev) => [...prev, author]);
	}

	function deleteAuthorFromCourse(author) {
		setAvailableAuthors((prev) => [...prev, author]);
		setSelectedAuthors((prev) => prev.filter((a) => a.id !== author.id));
	}

	function addNewCourse() {
		const newCourse = {
			title: fields.title,
			description: fields.description,
			duration: +fields.duration,
			creationDate: new Date().toDateString(),
			authors: [...selectedAuthors.map((author) => author.id)],
		};

		dispatch(addCourseAsync(newCourse));
	}

	function updateCourse(id) {
		const updatedCourse = {
			title: fields.title,
			description: fields.description,
			duration: fields.duration,
			authors: [...selectedAuthors.map((author) => author.id)],
		};

		dispatch(updateCourseAsync({ id, updatedCourse }));
	}

	function isFieldsValidated() {
		let existFields = 0;
		let validatedFields = 0;

		const copiedFields = { ...fields };

		delete copiedFields.author;

		for (const field in copiedFields) {
			if (Object.hasOwnProperty.call(copiedFields, field)) {
				const element = copiedFields[field];

				existFields++;

				element.toString().length && validatedFields++;
			}
		}

		return existFields === validatedFields;
	}

	function isAuthorsAdded() {
		return !!selectedAuthors.length;
	}

	function clearAuthorField() {
		setFields((prev) => ({
			...prev,
			author: '',
		}));
	}

	useEffect(() => {
		if (!course) return;

		setFields((prev) => {
			return {
				...prev,
				title: course.title,
				description: course.description,
				duration: course.duration,
			};
		});
	}, [course]);

	return (
		<form className={styles['add-course-form']}>
			<div className={styles['row']}>
				<Input
					name='title'
					labelText='Title'
					placeholder='Enter title...'
					value={fields.title}
					onChange={updateField}
				/>
				<Button
					onClick={() => {
						if (isAuthorsAdded() && isFieldsValidated()) {
							isUpdateCoursePage ? updateCourse(course.id) : addNewCourse();
							navigate('/courses');
						} else {
							alert('Please, fill in all fields');
						}
					}}
				>
					{isUpdateCoursePage ? BUTTON_UPDATE_COURSE : BUTTON_CREATE_COURSE}
				</Button>
			</div>
			<Textarea
				placeholder='Enter description...'
				name='description'
				labelText='Description'
				value={fields.description}
				onChange={updateField}
			/>
			<div className={styles['form-details']}>
				<div className={styles['form-details__item']}>
					<h3 className={styles['form-details__item-title']}>Add author</h3>
					<Input
						labelText='Author name'
						placeholder='Enter author name...'
						name='author'
						value={fields.author}
						onChange={updateField}
					/>
					<div className={styles['button-wrapper']}>
						<Button onClick={addNewAuthor}>{BUTTON_CREATE_AUTHOR}</Button>
					</div>
				</div>

				<div className={styles['form-details__item']}>
					<h3 className={styles['form-details__item-title']}>Authors</h3>
					<ul className={styles['list']}>
						{availableAuthors.length ? (
							availableAuthors.map((author) => (
								<li className={styles['list__item']} key={author.id}>
									<span className={styles['list__item-name']}>
										{author.name}
									</span>
									<Button onClick={() => addAuthorToCourse(author)}>
										{BUTTON_ADD_AUTHOR}
									</Button>
								</li>
							))
						) : (
							<span className={styles['list-empty']}>Author list is empty</span>
						)}
					</ul>
				</div>

				<div className={styles['form-details__item']}>
					<h3 className={styles['form-details__item-title']}>Duration</h3>
					<Input
						labelText='Duration'
						placeholder='Enter duration in minutes...'
						name='duration'
						pattern='[0-9]*'
						value={fields.duration}
						onChange={updateDurationField}
					/>
					<span className={styles['duration-time']}>
						Duration:{' '}
						<span className={styles['bold']}>
							{timeConvert(fields.duration, true)}
						</span>{' '}
						hours
					</span>
				</div>

				<div className={styles['form-details__item']}>
					<h3 className={styles['form-details__item-title']}>Course authors</h3>
					<ul className={styles['list']}>
						{selectedAuthors.length ? (
							selectedAuthors.map((author) => (
								<li className={styles['list__item']} key={author.id}>
									<span className={styles['list__item-name']}>
										{author.name}
									</span>
									<Button onClick={() => deleteAuthorFromCourse(author)}>
										{BUTTON_DELETE_AUTHOR}
									</Button>
								</li>
							))
						) : (
							<span className={styles['list-empty']}>Author list is empty</span>
						)}
					</ul>
				</div>
			</div>
		</form>
	);
}

export default CourseFrom;
