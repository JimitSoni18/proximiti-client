import { BASE_API_URL } from "~/env";
import { getAuthHeader } from ".";
import {get} from"./client";
import type { Conversation } from "~/types/api/conversations";
import type { Response } from "~/types/api/response";

export type User = {
	username: string;
	password: string;
};

const ENDPOINT = `${BASE_API_URL}/api/conversations/list`;

export async function conversationListFetchAPI(): Promise<Response<Conversation[]>> {
	const authHeaders = getAuthHeader();

	if (!authHeaders) {
		// TODO: trace
		return {
			status: "error",
			message: "something went wrong",
		};
	}

	return get(ENDPOINT, authHeaders);
}
