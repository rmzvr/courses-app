import './Textarea.css';

function Textarea({
	labelText = '',
	placeholder = '',
	value = '',
	name = '',
	onChange,
}) {
	return (
		<div className='textarea-wrapper'>
			{labelText && <label htmlFor='textarea'>{labelText}</label>}
			<textarea
				id='textarea'
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={(event) => onChange(event)}
			/>
		</div>
	);
}

export default Textarea;
