import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import type { DOMElement } from "solid-js/jsx-runtime";
import signUpAPI from "~/api/sign-up";
import { setUser, store } from "~/store/authstore";

export default function SignUp() {
	const [showPassword, setShowPassword] = createSignal(false);
	const navigate = useNavigate();

	function toggleShowPassword() {
		setShowPassword(!showPassword());
	}

	createEffect(() => {
		console.log(store.user);
		if (store.user) {
			navigate("/me/chats", { replace: true });
		}
	});

	async function handleSubmit(
		e: SubmitEvent & {
			currentTarget: HTMLFormElement;
			target: DOMElement;
		},
	) {
		e.preventDefault();
		if (!e.target) return;
		const formData = new FormData(e.target as HTMLFormElement);
		const response = await signUpAPI({
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
				<h3 class="my-4">Sign Up</h3>
				<input type="text" placeholder="Enter your username" name="username" />
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
					Sign Up
				</button>
			</form>
		</main>
	);
}
