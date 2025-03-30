import { BASE_API_URL } from "~/env";
import { get } from "./client";
import { getAuthHeader } from "./index";
import type { Response } from "~/types/api/response";

export type SearchUser = {
	username: string;
	profilePictureUrl?: string;
	id: number;
	rejected: boolean;
}

export async function searchUsers(query: string): Promise<Response<SearchUser[]>> {
	const authHeaders = getAuthHeader();

	if (!authHeaders) {
		// TODO: trace
		return {
			status: "error",
			message: "something went wrong",
		};
	}

	return get(`${BASE_API_URL}/user?q=${query}`);
}
