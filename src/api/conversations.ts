import { BASE_API_URL } from "~/env";
import {DEFAULT_HEADERS} from ".";

export type User = {
	username: string;
	password: string;
};

const API = `${BASE_API_URL}/api/auth/login`;

export async function conversationFetchAPI(user: User): Promise<SignInResponse> {
	return await (
		await fetch(API, {
			body: JSON.stringify(user),
			method: "POST",
			headers: DEFAULT_HEADERS,
		})
	).json();
}
