import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';
import { logoutUserAsync } from '../../store/userSlice';
import Logo from './components/Logo/Logo';
import styles from './Header.module.css';

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [userName, setUserName] = useState('');

	const token = localStorage.getItem('jwt');

	useEffect(() => {
		setUserName(localStorage.getItem('userName'));
	}, [userName]);

	function logout() {
		dispatch(logoutUserAsync(token));

		navigate('/login');
	}

	return (
		<header className={styles['header']}>
			<Logo />
			<span className={styles['spacer']} />
			{userName && <span className={styles['username']}>{userName}</span>}
			{location.pathname === '/login' ||
			location.pathname === '/registration' ? null : (
				<Button size='small' onClick={logout}>
					{BUTTON_LOGOUT}
				</Button>
			)}
		</header>
	);
}

export default Header;
