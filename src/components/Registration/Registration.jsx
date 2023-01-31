import React, { useState } from 'react';
import styles from './Registration.module.css';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services';

function Registration() {
	const [fields, setFields] = useState({
		name: '',
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	function updateField(event) {
		const name = event.target.name;
		const value = event.target.value;
		setFields((values) => ({ ...values, [name]: value }));
	}

	async function register(event) {
		event.preventDefault();

		const credentials = { ...fields };

		const { successful } = await registerUser(credentials);

		if (successful) {
			navigate('/login');
		}
	}

	return (
		<section className={styles['registration']}>
			<h1 className={styles['registration__title']}>Registration</h1>
			<form className={styles['registration__form']} onSubmit={register}>
				<ul className={styles['registration__form-items']}>
					<li className={styles['registration__form-item']}>
						<Input
							placeholder='Enter name'
							labelText='Name'
							name='name'
							value={fields.name}
							onChange={updateField}
						/>
					</li>
					<li className={styles['registration__form-item']}>
						<Input
							placeholder='Enter email'
							labelText='Email'
							name='email'
							value={fields.email}
							onChange={updateField}
						/>
					</li>
					<li className={styles['registration__form-item']}>
						<Input
							placeholder='Enter password'
							labelText='Password'
							name='password'
							type='password'
							value={fields.password}
							onChange={updateField}
						/>
					</li>
				</ul>
				<Button type='submit'>Registration</Button>
			</form>
			<span className={styles['registration__hint']}>
				If you have an account you can <Link to={'/login'}>Login</Link>
			</span>
		</section>
	);
}

export default Registration;
