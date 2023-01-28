export async function loginUser(credentials) {
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
}

export async function registerUser(credentials) {
	const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
}

export async function fetchAuthors() {
	const response = await fetch('http://localhost:4000/authors/all');

	if (response.ok) {
		return await response.json();
	} else {
		return [];
	}
}

export async function fetchCourses() {
	const response = await fetch('http://localhost:4000/courses/all');

	if (response.ok) {
		return await response.json();
	} else {
		return [];
	}
}
