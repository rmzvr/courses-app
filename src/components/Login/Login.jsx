import React, { useState } from 'react';
import './Login.css';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../store/userSlice';
import { loginUser } from '../../services';

function Login() {
	const dispatch = useDispatch();

	const [fields, setFields] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	function updateField(event) {
		const name = event.target.name;
		const value = event.target.value;
		setFields((values) => ({ ...values, [name]: value }));
	}

	async function login(event) {
		event.preventDefault();

		const credentials = { ...fields };

		const { successful, result: token, user } = await loginUser(credentials);

		if (successful && token) {
			dispatch(
				saveUser({
					name: user.name,
					email: user.email,
					token: token,
					isAuth: true,
				})
			);

			navigate('/courses');
		}
	}

	return (
		<section className='login'>
			<h1 className='login__title'>Login</h1>
			<form className='login__form' onSubmit={login}>
				<ul className='login__form-items'>
					<li className='login__form-item'>
						<Input
							placeholder='Enter email'
							labelText='Email'
							name='email'
							value={fields.email}
							onChange={updateField}
						/>
					</li>
					<li className='login__form-item'>
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
				<Button className='login__form-button' type='submit'>
					Login
				</Button>
			</form>
			<span className='login__hint'>
				If you not have an account you can{' '}
				<Link to={'/registration'}>Registration</Link>
			</span>
		</section>
	);
}

export default Login;
