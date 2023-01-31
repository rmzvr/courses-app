import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AuthRoute() {
	const location = useLocation();
	const isAuth = !!localStorage.getItem('jwt');

	return isAuth ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
}

export default AuthRoute;
