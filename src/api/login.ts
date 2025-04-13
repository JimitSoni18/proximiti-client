import type { RequestUser, SignInResponse } from "~/types/api/auth";
import { BASE_API_URL } from "~/env";
import { post } from "./client";
import { DEFAULT_HEADERS } from ".";

const ENDPOINT = `${BASE_API_URL}/api/auth/login`;

export default async function loginAPI(
	user: RequestUser,
): Promise<SignInResponse> {
	return await post(ENDPOINT, JSON.stringify(user), DEFAULT_HEADERS);
}
