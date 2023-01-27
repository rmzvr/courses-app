import React from 'react';
import './Input.css';
import { v4 as uuidv4 } from 'uuid';

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
			{labelText && <label htmlFor={'input-' + uuidv4()}>{labelText}</label>}
			<input
				id={'input-' + uuidv4()}
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
