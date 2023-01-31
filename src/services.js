export async function loginUser(credentials) {
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		return await response.json();
	}
}

export async function registerUser(credentials) {
	const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		return await response.json();
	}
}

export async function logoutUser(token) {
	await fetch('http://localhost:4000/logout', {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});
}

export async function getCurrentUser(token) {
	const response = await fetch('http://localhost:4000/users/me', {
		method: 'GET',
		headers: {
			Authorization: token,
		},
	});

	if (response.ok) {
		return await response.json();
	}
}

export async function fetchAuthors() {
	const response = await fetch('http://localhost:4000/authors/all');

	if (response.ok) {
		return await response.json();
	}
}

export async function addAuthor(author) {
	const token = localStorage.getItem('jwt');

	const response = await fetch('http://localhost:4000/authors/add', {
		method: 'POST',
		body: JSON.stringify(author),
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		return await response.json();
	}
}

export async function fetchCourses() {
	const response = await fetch('http://localhost:4000/courses/all');

	if (response.ok) {
		return await response.json();
	}
}

export async function addCourse(course) {
	const token = localStorage.getItem('jwt');

	const response = await fetch(`http://localhost:4000/courses/add`, {
		method: 'POST',
		body: JSON.stringify(course),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

	if (response.ok) {
		return await response.json();
	}
}

export async function updateCourse({ id, updatedCourse }) {
	const token = localStorage.getItem('jwt');

	const response = await fetch(`http://localhost:4000/courses/${id}`, {
		method: 'PUT',
		body: JSON.stringify(updatedCourse),
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	});

	if (response.ok) {
		const { result } = await response.json();

		return {
			...result,
			...updatedCourse,
		};
	}
}

export async function deleteCourse(id) {
	const token = localStorage.getItem('jwt');

	const response = await fetch(`http://localhost:4000/courses/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		},
	});

	if (response.ok) {
		await response.json();
		return id;
	}
}
