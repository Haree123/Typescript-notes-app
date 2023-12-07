import { ReactNode, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../types/types";
import { createNotesWithTags } from "../redux/reducers/note-reducers";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  const { notes, tags } = useSelector((state: RootState) => state.note);

  const noteTags = useMemo(() => {
    if (notes && tags) {
      return notes.map((note) => {
        return {
          ...note,
          tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
        };
      });
    }
    return [];
  }, [notes, tags]);

  useEffect(() => {
    dispatch(createNotesWithTags(noteTags));
  }, [notes, noteTags, tags]);

  return (
    <div className="my-6 px-4 sm:px-6 md:px-8 lg:px-24 xl:px-48 2xl:px-60">
      {children}
    </div>
  );
};

export default Layout;
