import type { RouteSectionProps } from "@solidjs/router";
import SideDock from "~/components/SideDock";

export default function HomeLayout(props: RouteSectionProps) {
	return (
		<div class="grid grid-cols-[80px_auto] h-full">
			<SideDock />
			<div>{props.children}</div>
		</div>
	);
}
