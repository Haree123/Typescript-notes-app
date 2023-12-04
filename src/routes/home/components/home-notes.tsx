import { FC } from "react";
import { Autocomplete, TextField } from "@mui/material";

const HomeNotes: FC = () => {
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
            options={[]}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeNotes;
