import styles from './Textarea.module.css';

function Textarea({
	labelText = '',
	placeholder = '',
	value = '',
	name = '',
	onChange,
}) {
	return (
		<div>
			{labelText && (
				<label className={styles['label']} htmlFor='textarea'>
					{labelText}
				</label>
			)}
			<textarea
				className={styles['textarea']}
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
