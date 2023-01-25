import React from 'react';
import Button from '../../common/Button/Button';
import { BUTTON_LOGOUT } from '../../constants';
import Logo from './components/Logo/Logo';
import './Header.css';

function Header() {
	return (
		<header>
			<Logo />
			<span className='spacer' />
			<span className='username'>Dave</span>
			<Button size='small'>{BUTTON_LOGOUT}</Button>
		</header>
	);
}

export default Header;
