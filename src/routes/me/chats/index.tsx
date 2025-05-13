import { createSignal, For, Match, Show, Suspense, Switch } from "solid-js";
import { createEffect, createResource } from "solid-js";
import { conversationListFetchAPI } from "~/api/conversations";

import type { Accessor, Setter } from "solid-js";
import { searchUsers } from "~/api/user";
import { debounce } from "~/utils/debounce";

enum CurrentTab {
	all,
	pending,
	online,
	addFriend,
}

export default function ChatList() {
	const [currentTab, setCurrentTab] = createSignal(CurrentTab.all);
	const [list, { mutate, refetch }] = createResource(conversationListFetchAPI);
	createEffect(() => {
		console.log("what is this", list(), list.loading);
	});

	return (
		<>
			<div class="flex h-full">
				<div class="basis-3xs">
					{/*<ul>
						<li class="flex items-center py-2 gap-1"><img src="/icons/friend.svg" alt="hi" class="inline" />Add Friend</li>
					</ul>*/}
					<div class="flex justify-between p-1">
						<small>Direct Messages</small>+
					</div>
				</div>
				<div class="flex flex-col grow">
					<Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
					<div class="grow">
						<Switch>
							<Match when={currentTab() === CurrentTab.addFriend}>
								<FriendSearch />
							</Match>
						</Switch>
					</div>
				</div>
			</div>
		</>
	);
}

type TabProps = {
	currentTab: Accessor<CurrentTab>;
	setCurrentTab: Setter<CurrentTab>;
};

function Tabs(props: TabProps) {
	return (
		<div class="flex p-2 gap-2">
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
			<span
				class="tab-theme"
				onclick={() => props.setCurrentTab(CurrentTab.addFriend)}
				classList={{
					"!bg-[#1e1b4b] text-indigo-400":
						props.currentTab() === CurrentTab.addFriend,
				}}
			>
				Add Friend
			</span>
		</div>
	);
}

function FriendSearch() {
	const [search, setSearch] = createSignal("");
	const [userList, { refetch }] = createResource(getUserSearchList);
	const debouncedRefetch = debounce(refetch);
	async function getUserSearchList() {
		const query = search();
		if (!query) return null;
		const res = await searchUsers(query);
		if (res.status === "error") return null;
		return res.body;
	}
	createEffect(() => {
		console.log("what is thsi:", userList());
	});
	return (
		<div class="p-2">
			<input
				type="text"
				placeholder="Search friends by username"
				class="w-full bg-slate-800"
				oninput={(e) => {
					setSearch(e.target.value);
					debouncedRefetch();
				}}
			/>
			<Show when={search()} fallback="Enter username">
				<Suspense fallback="loading">
					<Show when={userList()!==null} fallback="loading">
					<For each={userList()} fallback={"nothing here"}>
						{(item) => (
							<div class="w-full flex">
								<img src={item.profilePictureUrl} alt="" />
								<span>{item.username}</span>
							</div>
						)}
					</For>
					</Show>
				</Suspense>
			</Show>
		</div>
	);
}
