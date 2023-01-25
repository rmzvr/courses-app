import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { BUTTON_ADD_COURSE, BUTTON_SEARCH } from '../../../../constants';
import './SearchBar.css';

function SearchBar({ handleChange, handleSubmit, value, handleClick }) {
	return (
		<form className='search-bar' onSubmit={handleSubmit}>
			<Input
				placeholder='Enter course name or id...'
				value={value}
				onChange={handleChange}
			/>
			<Button type='submit'>{BUTTON_SEARCH}</Button>
			<span className='spacer'></span>
			<Button onClick={handleClick}>{BUTTON_ADD_COURSE}</Button>
		</form>
	);
}

export default SearchBar;
