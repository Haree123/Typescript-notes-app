import { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/types";

const HomeNotes: FC = () => {
  const availableTags = useSelector((state: RootState) => state.note.tags);

  return (
    <div className="mt-14">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="mb-3">Title</p>
          <TextField size="small" sx={{ width: "100%" }} />
        </div>

        <div className="flex-1">
          <p className="mb-3">Tags</p>
          <Autocomplete
            size="small"
            options={availableTags}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeNotes;
