import type { RequestUser, SignInResponse } from "~/types/api/auth";
import { BASE_API_URL } from "~/env";
import { post } from "./client";

const ENDPOINT = `${BASE_API_URL}/api/auth/sign-up`;

export default async function signUpAPI(
	user: RequestUser,
): Promise<SignInResponse> {
	return await post(ENDPOINT, JSON.stringify(user));
}
