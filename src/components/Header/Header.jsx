import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';
import Logo from './components/Logo/Logo';
import './Header.css';

function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const [userName, setUserName] = useState('');

	useEffect(() => {
		setUserName(localStorage.getItem('userName'));
	}, [userName]);

	function logout() {
		localStorage.clear();
		navigate('/login');
	}

	return (
		<header>
			<Logo />
			<span className='spacer' />
			{userName && <span className='username'>{userName}</span>}
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
