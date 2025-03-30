import { store } from "~/store/authstore";

const CONTENT_TYPE_HEADER = "Content-Type";
const AUTH_HEADER = "Authorization";
const CONTENT_TYPE_JSON = "application/json";

const DEFAULT_HEADERS = new Headers();
DEFAULT_HEADERS.append(CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON);

function getAuthHeader() {
	const token = store.user?.token;
	if (!token) return null;

	const authHeaders = new Headers();
	authHeaders.append(CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON);
	authHeaders.append(AUTH_HEADER, `Bearer ${token}`);
	return authHeaders;
}

export { DEFAULT_HEADERS, getAuthHeader };
