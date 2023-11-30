import { Autocomplete, Button, TextField } from "@mui/material";

const NewNoteForms = () => {
  return (
    <>
      <div className="flex gap-8 items-center my-5">
        <div className="flex-1">
          <p className="mb-3">Title</p>
          <TextField
            size="small"
            sx={{
              width: "100%",
            }}
          />
        </div>
        <div className="flex-1">
          <p className="mb-3">Tags</p>
          <Autocomplete
            freeSolo
            sx={{
              width: "100%",
            }}
            size="small"
            options={[]}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>

      <div className="my-3">
        <p className="mb-3">Body</p>
        <TextField
          multiline
          maxRows={15}
          rows={15}
          sx={{ width: "100%" }}
          inputProps={{ style: { resize: "both" } }}
        />
      </div>

      <div className="flex items-center justify-end gap-3 mt-5">
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Save</Button>
      </div>
    </>
  );
};

export default NewNoteForms;
