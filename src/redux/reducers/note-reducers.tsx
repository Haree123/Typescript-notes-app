import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { note, NoteState, SimpliedNote, Tag } from "../../types/types";

const noteInitialState: NoteState = {
  notes: [],
  notesWithTags: [],
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
    deleteNote: (state, action: PayloadAction<Partial<note>>) => {
      const { id } = action.payload;

      if (id) {
        state.notes = state.notes.filter((note) => note.id !== id);
      }
    },
    updateNote: (state, action: PayloadAction<note>) => {
      const { id, tags, ...items } = action.payload;

      state.notes = state.notes.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...items,
            tagIds: tags.map((tagItem) => tagItem.id),
          };
        }
        return item;
      });
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
    createNotesWithTags: (state, action: PayloadAction<SimpliedNote[]>) => {
      state.notesWithTags = action.payload || [];
    },
  },
});

export const {
  addTags,
  createNote,
  createNotesWithTags,
  deleteNote,
  updateNote,
} = NoteReducers.actions;

export default NoteReducers.reducer;
