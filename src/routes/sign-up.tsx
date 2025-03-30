import type { RouteSectionProps } from "@solidjs/router";

import Nav from "~/components/LandingNav";

export default function SignUpLayout(props: RouteSectionProps) {
	return (
		<>
			<Nav />
			{props.children}
		</>
	);
}
