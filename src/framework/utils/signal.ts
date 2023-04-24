const signals = new Map<string, Signal<any>>();

export type SignalModifier<T> = (old: T) => T;

export type GetSignalValue<T> = () => T;
export type SetSignalValue<T> = (modifier: SignalModifier<T>) => void;

export type Signal<T> = {
  get: GetSignalValue<T>;
  set: SetSignalValue<T>;
};

export const newSignal = <T>(key: string, initial: T) => {
  if (signals.has(key)) {
    return signals.get(key) as Signal<T>;
  }

  let value = initial;

  const signal = {
    get: () => value,
    set: (n: SignalModifier<T>) => (value = n(value)),
  } as Signal<T>;

  signals.set(key, signal);

  return signal;
};
