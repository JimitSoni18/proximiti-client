import { A, useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";

import chatIcon from "~/../public/icons/chat.svg";
import exploreIcon from "~/../public/icons/explore.svg";
import profileIcon from "~/../public/icons/profile.svg";

export default function SideDock() {
	return (
		<div class="flex flex-col py-2 max-h-screen gap-1 h-full overflow-hidden">
			<div class="px-2">
				<TabButton name="Chats" href="/me/chats" icon={chatIcon} />
				<TabButton name="Explore" href="/me/explore" icon={exploreIcon} />
			</div>
			<hr class="h-1 bg-white rounded m-2 shrink-0" />
			<div class="grow overflow-hidden">
				<div class="h-full overflow-auto px-2" />
			</div>
			<hr class="h-1 bg-white rounded m-2 shrink-0" />
			<div class="px-2">
				<TabButton name="Profile" href="/me/profile" icon={profileIcon} />
			</div>
		</div>
	);
}

type TabButtonProps = Readonly<{
	name: string;
	href: string;
	icon: string;
}>;

function TabButton(props: TabButtonProps) {
	const location = useLocation();
	const currentComponent = createMemo(() =>
		location.pathname.split("/").at(-1),
	);
	return (
		<A
			href={props.href}
			replace
			class="rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800"
			classList={{ "bg-gray-800": currentComponent() === props.name.toLowerCase() }}
		>
			<span>
				<img src={props.icon} alt={props.name} />
			</span>
			<h6>{props.name}</h6>
		</A>
	);
}
