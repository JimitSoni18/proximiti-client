import { createSignal } from "solid-js";

import type { Accessor, Setter } from "solid-js";

enum CurrentTab {
	all = 1,
	pending = 2,
	online = 3,
}

export default function () {
	const [currentTab, setCurrentTab] = createSignal(CurrentTab.all);

	return (
		<>
			<div class="p-2">
				<Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
			</div>
			<div class="grow p-2">hi</div>
		</>
	);
}
type TabProps = {
	currentTab: Accessor<CurrentTab>;
	setCurrentTab: Setter<CurrentTab>;
};

function Tabs(props: TabProps) {
	return (
		<div class="flex gap-2">
			<span
				class="tabs"
				onclick={() => props.setCurrentTab(CurrentTab.online)}
				classList={{ "bg-slate-600": props.currentTab() === CurrentTab.online }}
			>
				Online
			</span>
			<span
				class="tabs"
				onclick={() => props.setCurrentTab(CurrentTab.all)}
				classList={{ "bg-slate-600": props.currentTab() === CurrentTab.all }}
			>
				All
			</span>
			<span
				class="tabs"
				onclick={() => props.setCurrentTab(CurrentTab.pending)}
				classList={{
					"bg-slate-600": props.currentTab() === CurrentTab.pending,
				}}
			>
				Pending
			</span>
		</div>
	);
}
