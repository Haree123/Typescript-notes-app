import { Middleware } from "@reduxjs/toolkit";

import { keyConfig } from "../../types/types";

export const localStorageMiddleware =
  (keysToPersist: keyConfig[]): Middleware =>
  (store) =>
  (next) =>
  (action) => {
    const result = next(action);
    const state = store.getState();

    keysToPersist.forEach(({ key, reducer }) => {
      const reducerState = state[reducer];
      const keyToPersist = reducerState[key];

      localStorage.setItem(key, JSON.stringify(keyToPersist));
    });

    return result;
  };
