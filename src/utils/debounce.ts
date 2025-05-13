// biome-ignore lint/complexity/noBannedTypes: yes
export function debounce<T extends Function>(f: T, t = 300) {
	let timeout: number;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(f, t);
	};
}
