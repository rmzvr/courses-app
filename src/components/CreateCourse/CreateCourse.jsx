import React, { useState } from 'react';
import './CreateCourse.css';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';
import Button from '../../common/Button/Button';
import {
	BUTTON_ADD_AUTHOR,
	BUTTON_CREATE_AUTHOR,
	BUTTON_CREATE_COURSE,
	BUTTON_DELETE_AUTHOR,
} from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import timeConvert from '../../helpers/pipeDuration';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../store/coursesSlice';
import { selectAllAuthors } from '../../store/authorsSlice';
import { addAuthor } from '../../store/authorsSlice';

function CreateCourse() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authors = useSelector(selectAllAuthors);

	const [fields, setFields] = useState({
		title: '',
		description: '',
		duration: '',
		author: '',
	});

	const [availableAuthors, setAvailableAuthors] = useState(authors);
	const [selectedAuthors, setSelectedAuthors] = useState([]);

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
		setAvailableAuthors((prev) => [
			...prev,
			{ id: uuidv4(), name: fields.author },
		]);

		setFields((prev) => ({
			...prev,
			author: '',
		}));
	}

	function addAuthorToCourse(author) {
		setAvailableAuthors((prev) => prev.filter((a) => a.id !== author.id));
		setSelectedAuthors((prev) => [...prev, author]);

		dispatch(addAuthor(author));
	}

	function deleteAuthorFromCourse(author) {
		setAvailableAuthors((prev) => [...prev, author]);
		setSelectedAuthors((prev) => prev.filter((a) => a.id !== author.id));
	}

	function addNewCourse() {
		const course = {
			id: uuidv4(),
			title: fields.title,
			description: fields.description,
			duration: fields.duration,
			creationDate: new Date().toDateString(),
			authors: [...selectedAuthors.map((author) => author.id)],
		};

		dispatch(addCourse(course));
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

				element.length && validatedFields++;
			}
		}

		return existFields === validatedFields;
	}

	function isAuthorsAdded() {
		return !!selectedAuthors.length;
	}

	return (
		<form className='add-course-form'>
			<div className='row'>
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
							addNewCourse();
							navigate('/courses');
						} else {
							alert('Please, fill in all fields');
						}
					}}
				>
					{BUTTON_CREATE_COURSE}
				</Button>
			</div>
			<Textarea
				placeholder='Enter description...'
				name='description'
				labelText='Description'
				value={fields.description}
				onChange={updateField}
			/>
			<div className='form-details'>
				<div className='form-details__item'>
					<h3 className='form-details__item-title'>Add author</h3>
					<Input
						labelText='Author name'
						placeholder='Enter author name...'
						name='author'
						value={fields.author}
						onChange={updateField}
					/>
					<div className='button-wrapper'>
						<Button onClick={addNewAuthor}>{BUTTON_CREATE_AUTHOR}</Button>
					</div>
				</div>

				<div className='form-details__item'>
					<h3 className='form-details__item-title'>Authors</h3>
					<ul className='list'>
						{availableAuthors.length ? (
							availableAuthors.map((author) => (
								<li className='list__item' key={author.id}>
									<span className='list__item-name'>{author.name}</span>
									<Button onClick={() => addAuthorToCourse(author)}>
										{BUTTON_ADD_AUTHOR}
									</Button>
								</li>
							))
						) : (
							<span className='list-empty'>Author list is empty</span>
						)}
					</ul>
				</div>

				<div className='form-details__item'>
					<h3 className='form-details__item-title'>Duration</h3>
					<Input
						labelText='Duration'
						placeholder='Enter duration in minutes...'
						name='duration'
						pattern='[0-9]*'
						value={fields.duration}
						onChange={updateDurationField}
					/>
					<span className='duration-time'>
						Duration:{' '}
						<span className='bold'>{timeConvert(fields.duration, true)}</span>{' '}
						hours
					</span>
				</div>

				<div className='form-details__item'>
					<h3 className='form-details__item-title'>Course authors</h3>
					<ul className='list'>
						{selectedAuthors.length ? (
							selectedAuthors.map((author) => (
								<li className='list__item' key={author.id}>
									<span className='list__item-name'>{author.name}</span>
									<Button onClick={() => deleteAuthorFromCourse(author)}>
										{BUTTON_DELETE_AUTHOR}
									</Button>
								</li>
							))
						) : (
							<span className='list-empty'>Author list is empty</span>
						)}
					</ul>
				</div>
			</div>
		</form>
	);
}

export default CreateCourse;
