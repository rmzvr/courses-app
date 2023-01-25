import React from 'react';
import './Input.css';

function Input({
	type = 'text',
	labelText = '',
	placeholder = '',
	value = '',
	name = '',
	onChange,
	pattern,
}) {
	return (
		<div className='input-wrapper'>
			{labelText && <label htmlFor='input'>{labelText}</label>}
			<input
				id='input'
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={(event) => onChange(event)}
				pattern={pattern ? pattern : null}
			/>
		</div>
	);
}

export default Input;
