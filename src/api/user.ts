import { BASE_API_URL } from "~/env";
import { get } from "./client";
import { authHeaders } from "./index";
import type { Response } from "~/types/api/response";

export type SearchUser = {
	username: string;
	profilePictureUrl?: string;
	id: number;
};

export async function searchUsers(
	query: string,
): Promise<Response<SearchUser[]>> {
	const headers = authHeaders();
	if (!headers) {
		// TODO: trace
		return {
			status: "error",
			message: "something went wrong",
		};
	}

	return get(`${BASE_API_URL}/api/user/search?q=${query}`, headers);
}
