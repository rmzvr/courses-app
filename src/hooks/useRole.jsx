import { useSelector } from 'react-redux';
import { selectRole } from '../store/userSlice';

export function useRole() {
	const role = useSelector(selectRole);

	return role === 'admin';
}
