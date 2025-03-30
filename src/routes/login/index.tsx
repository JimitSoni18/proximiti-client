import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import type { DOMElement } from "solid-js/types/jsx.js";

import loginAPI from "~/api/login";
import { setUser, store } from "~/store/authstore";

export default function Login() {
	const [showPassword, setShowPassword] = createSignal(false);
	const navigate = useNavigate();

	createEffect(() => {
		if (store.user) {
			navigate("/me/chats", { replace: true });
		}
	});

	function toggleShowPassword() {
		setShowPassword(!showPassword());
	}

	async function handleSubmit(
		e: SubmitEvent & {
			currentTarget: HTMLFormElement;
			target: DOMElement;
		},
	) {
		e.preventDefault();
		if (!e.target) return;
		const formData = new FormData(e.target as HTMLFormElement);
		const response = await loginAPI({
			username: (formData.get("username") as string) ?? "",
			password: (formData.get("password") as string) ?? "",
		});
		if (response.status === "ok") {
			setUser(response.body);
		}
	}
	return (
		<main class="normal-container grid grid-cols-2 gap-12">
			<div class="lg:p-4 p-3" />
			<form class="lg:p-4 p-3 flex flex-col gap-6" onsubmit={handleSubmit}>
				<h3 class="mb-5">Login</h3>
				<input
					type="text"
					placeholder="Enter your username"
					name="username"
				/>
				<div class="relative">
					<input
						type={showPassword() ? "text" : "password"}
						class="w-full"
						placeholder="Enter password"
						name="password"
					/>
					<button
						type="button"
						class="absolute right-1 top-1"
						onclick={toggleShowPassword}
					>
						<img
							src={`/icons/eye-${showPassword() ? "close" : "icon"}.svg`}
							alt="show"
						/>
					</button>
				</div>
				<button type="submit" class="primary">
					Login
				</button>
			</form>
		</main>
	);
}
