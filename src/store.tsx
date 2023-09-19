import { createContext, createEffect, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Track } from "./types";

export const storeName = "store";

const StoreContext = createContext({});

const localState = localStorage.getItem(storeName);

export const [state, setState] = createStore(
  localState ? JSON.parse(localState) : { tracks: [] }
);

export function StoreProvider(props) {
  createEffect(() => localStorage.setItem(storeName, JSON.stringify(state)));

  const store = [
    state,
    {
      storeTrack(track: Track) {
        setState((state) => ({
          tracks: [track, ...(state?.tracks ?? [])],
        }));
      },
    },
  ];

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext) as any;
}
