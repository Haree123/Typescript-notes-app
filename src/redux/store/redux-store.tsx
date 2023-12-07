import { combineReducers, configureStore } from "@reduxjs/toolkit";

import noteReducers from "../reducers/note-reducers";

import { RootState, keyConfig } from "../../types/types";
import { localStorageMiddleware } from "../middlewares/localstorage-middleware";

const keysToPersist: keyConfig[] = [
  { key: "notes", reducer: "note" },
  {
    key: "tags",
    reducer: "note",
  },
];

let preloadedState: Partial<RootState> = {};

keysToPersist.forEach(({ key, reducer }) => {
  const result = localStorage.getItem(key);

  if (result) {
    const parsedResult = JSON.parse(result);
    preloadedState = {
      ...preloadedState,
      [reducer]: {
        ...(preloadedState[reducer] || {
          notes: [],
          notesWithTags: [],
          tags: [],
        }),
        [key]: parsedResult,
      },
    };
  }
});

const rootReducers = combineReducers({
  note: noteReducers,
});

export const store = configureStore({
  reducer: rootReducers,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware(keysToPersist)),
});
