import React from 'react';
import './Button.css';

function Button({ type = 'button', size = 'big', onClick, children }) {
	return (
		<button className={size} type={type} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
