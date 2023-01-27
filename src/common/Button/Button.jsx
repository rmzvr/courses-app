import React from 'react';
import './Button.css';

function Button({
	className = '',
	type = 'button',
	size = 'big',
	form = '',
	onClick,
	children,
}) {
	return (
		<button
			className={`${className} ${size} ${form}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
