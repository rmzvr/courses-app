import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectRole } from '../../store/userSlice';

function PrivateRoute() {
	const role = useSelector(selectRole);

	return role === 'admin' ? <Outlet /> : <Navigate to='/courses' />;
}

export default PrivateRoute;
