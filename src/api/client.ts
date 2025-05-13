export async function get<T>(endpoint: string, headers?: Headers): Promise<T> {
	return await (
		await fetch(endpoint, {
			headers,
			method: "GET",
		})
	).json();
}

export async function post<T>(
	endpoint: string,
	body: string,
	headers?: Headers,
): Promise<T> {
	return await (
		await fetch(endpoint, {
			headers,
			method: "POST",
			body,
		})
	).json();
}
