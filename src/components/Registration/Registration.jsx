import React, { useState } from 'react';
import './Registration.css';
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
		<section className='registration'>
			<h1 className='registration__title'>Registration</h1>
			<form className='registration__form' onSubmit={register}>
				<ul className='registration__form-items'>
					<li className='registration__form-item'>
						<Input
							placeholder='Enter name'
							labelText='Name'
							name='name'
							value={fields.name}
							onChange={updateField}
						/>
					</li>
					<li className='registration__form-item'>
						<Input
							placeholder='Enter email'
							labelText='Email'
							name='email'
							value={fields.email}
							onChange={updateField}
						/>
					</li>
					<li className='registration__form-item'>
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
				<Button className='registration__form-button' type='submit'>
					Registration
				</Button>
			</form>
			<span className='registration__hint'>
				If you have an account you can <Link to={'/login'}>Login</Link>
			</span>
		</section>
	);
}

export default Registration;
