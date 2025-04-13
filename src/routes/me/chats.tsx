import type { RouteSectionProps } from "@solidjs/router";
import { createResource } from "solid-js";
import { conversationListFetchAPI } from "~/api/conversations";

export default function Chats(props: RouteSectionProps) {
	const [list, { mutate, refetch }] = createResource(conversationListFetchAPI);
	console.log(list());
	return (
		<>
			<div class="flex flex-col h-full">{props.children}</div>
		</>
	);
}
