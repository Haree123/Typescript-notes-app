import { FC } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import { note } from "../../../types/types";

const NewNoteForms: FC = () => {
  const navigate = useNavigate();
  const { errors, handleSubmit, setFieldValue, values } =
    useFormikContext<note>();
  const { markdown, title } = values;

  const handleTagsInputChange = debounce((_, inputValue) => {
    console.log(inputValue);
  }, 500);

  return (
    <>
      <div className="flex gap-8 items-center my-5">
        <div className="flex-1">
          <p className="mb-3">Title</p>

          <TextField
            error={Boolean(errors.title)}
            size="small"
            sx={{
              width: "100%",
            }}
            value={title ? title : ""}
            onChange={(e) => {
              setFieldValue("title", e.target.value);
            }}
            helperText={errors.title ? errors.title : ""}
          />
        </div>
        <div className="flex-1">
          <p className="mb-3">Tags</p>
          <Autocomplete
            multiple
            freeSolo
            sx={{
              width: "100%",
            }}
            size="small"
            options={["Helllo"]}
            onInputChange={handleTagsInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={errors.title ? <div className="h-5"></div> : ""}
              />
            )}
          />
        </div>
      </div>

      <div className="my-3">
        <p className="mb-3">Body</p>
        <TextField
          error={Boolean(errors.markdown)}
          multiline
          rows={15}
          sx={{ width: "100%" }}
          inputProps={{ style: { resize: "both" } }}
          value={markdown ? markdown : ""}
          onChange={(e) => {
            setFieldValue("markdown", e.target.value);
          }}
          helperText={errors.markdown ? errors.markdown : ""}
        />
      </div>

      <div className="flex items-center justify-end gap-3 mt-5">
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Save
        </Button>
      </div>
    </>
  );
};

export default NewNoteForms;
