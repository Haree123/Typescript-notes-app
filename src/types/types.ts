export interface Tag {
  id: string;
  label: string;
}

export interface noteItem {
  title: string;
  markdown: string;
  tags: Tag[];
}

export interface note extends noteItem {
  id: string;
}

export interface RawNoteItem {
  title: string;
  markdown: string;
  tagsIds: string[];
}

export interface RawNote extends RawNoteItem {
  id: string;
}

export type NoteState = {
  notes: RawNote[];
  tags: Tag[];
};

export interface SimpliedNote extends RawNote {
  tags: Tag[];
}

export interface keyConfig {
  key: string;
  reducer: keyof RootState;
}

export interface RootState {
  note: NoteState;
}
