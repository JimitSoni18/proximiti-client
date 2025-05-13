import type { Response } from "./response";

export type AuthenticatedUser = {
	id: number;
	profilePictureUrl?: string;
	username: string;
	token: string;
};

export type RequestUser = {
	username: string;
	password: string;
};

export type SignInResponse = Response<AuthenticatedUser>;
