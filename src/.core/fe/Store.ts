type Dispathcher<T> = (state: T) => void;

export type Observable<T> = T & {
  onChange: (dispatch: Dispathcher<T>) => void;
};

export const Store = <T extends object>(state: T) => {
  const subscribers = new Set<Dispathcher<T>>();

  const observable = Object.assign(state, {
    onChange: (dispatch: Dispathcher<T>) => subscribers.add(dispatch),
  });

  Object.keys(observable).forEach((key) => {
    let prevValue = state[key as keyof T];

    Object.defineProperty(observable, key, {
      get() {
        return prevValue;
      },

      set(value: T[keyof T]) {
        if (Object.is(prevValue, value)) return;

        // if (prevValue === value) return;

        // if (JSON.stringify(prevValue) === JSON.stringify(value)) return;

        prevValue = value;

        const { onChange, ...state } = observable;

        subscribers.forEach((fn) => fn(state as T));
      },
    });
  });

  return observable;
};
