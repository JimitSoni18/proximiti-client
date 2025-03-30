import { useSearchParams } from "@solidjs/router";

export default function Chats() {
	const [params, setParams] = useSearchParams();
	return (
		<>
			<div class="flex flex-col h-full">
				<div class="p-2">
					<Tabs />
				</div>
				<div class="grow p-2">hi</div>
			</div>
		</>
	);
}

function Tabs() {
	return (
		<div class="flex gap-2">
			<span class="p-1">Online</span>
			<span class="p-1">All</span>
			<span class="p-1">Pending</span>
		</div>
	);
}
