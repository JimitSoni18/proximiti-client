const context: Effect[] = [];

// biome-ignore lint/suspicious/noExplicitAny: just what i need
type AnyFn = () => any;
type SetterFn<T> = (prev: T) => T;
type ValidSignal<T> = T extends Promise<unknown>
	? never
	: // biome-ignore lint/complexity/noBannedTypes: just what i need
		T extends Function
		? never
		: T;

// NOTE: THESE SHOULD REMAIN PRIVATE, UNEXPORTED
const protectedSignalCleanUp = Symbol();
const protectedSignalAddEffect = Symbol();

export class Signal<T> {
	#value: ValidSignal<T>;
	#subscribedEffects = new Set<Effect>();

	static useState<T>(t: ValidSignal<T>) {
		return new Signal(t);
	}

	constructor(value: ValidSignal<T>) {
		if (value instanceof Promise || typeof value === "function") {
			throw new Error("Functions, Classes and Promises are not valid signals");
		}
		this.mutate.bind(this);
		this.#value = value;
	}

	get value() {
		const effect = context.at(-1);
		if (effect) effect.subscribe(this);
		return this.#value;
	}

	set value(nextValue: ValidSignal<T>) {
		if (nextValue instanceof Promise || typeof nextValue === "function") {
			throw new Error("Functions, Classes and Promises are not valid signals");
		}
		this.#value = nextValue;
		this.#runSubscriptions();
	}

	// biome-ignore lint/complexity/noBannedTypes: just what i need
	mutate(setter: SetterFn<T>): T extends Object ? void : never;
	mutate(setter: SetterFn<T>) {
		if (
			this.#value !== undefined &&
			this.#value !== null &&
			typeof this.#value !== "object"
		) {
			throw new Error(
				`mutate method is not defined for ${typeof this.#value} type`,
			);
		}
		setter(this.#value);
		this.#runSubscriptions();
	}

	#runSubscriptions() {
		for (const sub of [...this.#subscribedEffects]) {
			sub.exec();
		}
	}

	[protectedSignalCleanUp](effect: Effect) {
		this.#subscribedEffects.delete(effect);
	}

	[protectedSignalAddEffect](effect: Effect) {
		this.#subscribedEffects.add(effect);
	}
}

class Effect {
	#cb: AnyFn;
	#dependencies = new Set<Signal<unknown>>();

	static useEffect(cb: AnyFn, runOnInit?: boolean) {
		new Effect(cb, runOnInit);
	}

	constructor(cb: AnyFn, runOnInit = true) {
		this.#cb = cb;
		if (runOnInit) this.exec();
	}

	#cleanup() {
		for (const dep of this.#dependencies) {
			dep[protectedSignalCleanUp](this);
		}
		this.#dependencies.clear();
	}

	exec() {
		this.#cleanup();
		context.push(this);
		try {
			this.#cb();
		} finally {
			context.pop();
		}
	}

	subscribe(signal: Signal<unknown>) {
		signal[protectedSignalAddEffect](this);
		this.#dependencies.add(signal);
	}
}

export const useEffect = Effect.useEffect;
export const useState = Signal.useState;
