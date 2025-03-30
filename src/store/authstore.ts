import { createStore } from "solid-js/store";
import type { AuthenticatedUser } from "~/types/api/auth";

type UserStore = {
	user?: Readonly<AuthenticatedUser>;
};

const [store, setStore] = createStore<UserStore>({});

export function setUser(user: AuthenticatedUser) {
	setStore("user", user);
}

export function resetUser() {
	setStore("user", undefined);
}

export { store };
