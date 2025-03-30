import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

import type { Option } from "~/types/util";

export default function createRequest<Res>() {
	const [response, setResponse] = createSignal<Option<Res>>(null);
	const navigate = useNavigate();

	async function makeRequest(url: string, init: RequestInit) {
		const res = await fetch(url, init);
		const status = res.status;
		if (status === 401) {
			return navigate("/login", { replace: true });
		}
		const body = await res.json();
		setResponse(body);
	}

	return { response, makeRequest, mutate: setResponse };
}
