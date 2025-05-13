import { useNavigate, type RouteSectionProps } from "@solidjs/router";
import { createEffect } from "solid-js";
import SideDock from "~/components/SideDock";
import { store } from "~/store/authstore";

export default function HomeLayout(props: RouteSectionProps) {
	const navigate = useNavigate();

	createEffect(() => {
		if (!store.user) {
			navigate("/login");
		}
	});
	return (
		<div class="grid grid-cols-[80px_auto] h-full">
			<SideDock />
			<div>{props.children}</div>
		</div>
	);
}
