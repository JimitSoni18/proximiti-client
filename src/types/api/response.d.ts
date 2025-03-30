export type ErrResponse = {
	status: "error";
	message: string;
};

export type OkResponse<T> = {
	status: "ok";
	body: T;
};

export type Response<T> = ErrResponse | OkResponse<T>;
