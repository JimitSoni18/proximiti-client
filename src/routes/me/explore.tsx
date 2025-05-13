import { useSearchParams } from "@solidjs/router";

export default function Explore() {
	const [params, setParams] = useSearchParams();
	return (
		<>
			<div class="flex flex-col h-full">
				<div>hi</div>
				<div class="grow">hello</div>
			</div>
		</>
	);
}

function UserSearch() {}
