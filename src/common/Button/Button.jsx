import React from 'react';
import './Button.css';

function Button({
	className,
	type = 'button',
	size = 'big',
	onClick,
	children,
}) {
	return (
		<button className={`${className} ${size}`} type={type} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
