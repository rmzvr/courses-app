import React from 'react';
import styles from './Button.module.css';

function Button({
	className = '',
	type = 'button',
	size = 'big',
	form = '',
	onClick,
	children,
}) {
	console.log(className);
	return (
		<button
			className={`${styles[className] ?? ''} ${styles[size] ?? ''} ${
				styles[form] ?? ''
			} ${styles['button']}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
