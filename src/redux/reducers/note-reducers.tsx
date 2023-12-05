import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { note, NoteState, Tag } from "../../types/types";

const noteInitialState: NoteState = {
  notes: [],
  tags: [],
};

const NoteReducers = createSlice({
  name: "createNote",
  initialState: noteInitialState,
  reducers: {
    createNote: (state, action: PayloadAction<note>) => {
      const { tags, ...items } = action.payload;
      state.notes = [
        ...state.notes,
        { ...items, tagsIds: tags.map((val) => val.id) },
      ];
    },
    addTags: (state, action: PayloadAction<Tag>) => {
      const { id, label } = action.payload;

      state.tags = [
        ...state.tags,
        {
          id,
          label,
        },
      ];
    },
  },
});

export const { addTags, createNote } = NoteReducers.actions;

export default NoteReducers.reducer;
