import { combineReducers, configureStore } from "@reduxjs/toolkit";

import noteReducers from "../reducers/note-reducers";

import { keyConfig } from "../../types/types";
import { localStorageMiddleware } from "../middlewares/localstorage-middleware";

const keysToPersist: keyConfig[] = [
  { key: "notes", reducer: "notes" },
  {
    key: "tags",
    reducer: "notes",
  },
];

const rootReducers = combineReducers({
  notes: noteReducers,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware(keysToPersist)),
});
