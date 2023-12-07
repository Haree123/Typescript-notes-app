import { FC, useMemo, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState, SimpliedNote, Tag } from "../../../types/types";

const HomeNotes: FC = () => {
  const availableTags = useSelector((state: RootState) => state.note.tags);

  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[] | null>([]);

  return (
    <div className="mt-14">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="mb-3">Title</p>
          <TextField
            size="small"
            sx={{ width: "100%" }}
            value={title ? title : ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <p className="mb-3">Tags</p>
          <Autocomplete
            multiple
            size="small"
            sx={{ width: "100%" }}
            value={selectedTags ? selectedTags : []}
            options={availableTags}
            getOptionLabel={(option) => (option ? option.label : "")}
            renderInput={(params) => <TextField {...params} />}
            onChange={(_, newValue) => setSelectedTags(newValue)}
          />
        </div>
      </div>

      <div className="mt-5">
        <NoteCardContainer selectedTags={selectedTags} title={title} />
      </div>
    </div>
  );
};

type NoteCardContainerProps = {
  title: string;
  selectedTags: Tag[] | null;
};

const NoteCardContainer = ({ selectedTags, title }: NoteCardContainerProps) => {
  const { notes, notesWithTags } = useSelector(
    (state: RootState) => state.note
  );

  const filteredNotes = useMemo(() => {
    return notesWithTags?.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags?.length === 0 ||
          selectedTags?.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, notesWithTags, title, selectedTags]);

  return <NoteCard notes={filteredNotes} />;
};

type NoteCardProps = {
  notes: SimpliedNote[];
};

const NoteCard = ({ notes }: NoteCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-5 grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {notes?.map((item, index) => {
        return (
          <div
            key={index}
            className="border cursor-pointer rounded-md hover:scale-110 duration-300 flex justify-center items-center min-h-32 h-auto"
            onClick={() => {
              navigate(`/${item.id}`);
            }}
          >
            <div className="p-5 text-center w-full">
              <p className="font-semibold">{item.title}</p>
              <p className="h-5 w-2/3 mt-5 mx-auto text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                {item.markdown}
              </p>
              {item.tags.length > 0 ? (
                <div className="flex gap-2 flex-wrap justify-center mt-3">
                  {item.tags.map((tag, tagIndex) => {
                    return (
                      <div
                        key={tagIndex}
                        className="bg-primary rounded-md max-w-32 overflow-hidden"
                      >
                        <span className="px-2 py-1 w-full inline-block overflow-hidden whitespace-nowrap text-white text-sm text-ellipsis">
                          {tag.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeNotes;
