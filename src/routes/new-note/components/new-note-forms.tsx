import { FC } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import { RootState, Tag, note } from "../../../types/types";
import { addTags } from "../../../redux/reducers/note-reducers";

const NewNoteForms: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const availableTags = useSelector((state: RootState) => state.note.tags);

  const { errors, handleSubmit, setFieldValue, values } =
    useFormikContext<note>();
  const { markdown, title, tags } = values;

  const handleTagsChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: (string | Tag)[]
  ) => {
    const uniqueLabelsTag = new Set(tags.map((item) => item.label));

    //already created tags
    const existingTag = newValue.filter((item) => {
      const tagObj = item as Tag;
      return availableTags.some((obj) => obj.label === tagObj.label);
    });

    if (existingTag) {
      existingTag.forEach((item) => {
        const tagObj = item as Tag;
        if (!uniqueLabelsTag.has(tagObj.label)) {
          setFieldValue("tags", [...tags, item]);
        }
      });
    }

    //not created tags
    const nonExistingTags = newValue.filter((item) => {
      if (typeof item === "string") {
        return !availableTags.some((obj) => obj.label === item);
      }
      return false;
    });

    if (nonExistingTags) {
      nonExistingTags.forEach((item) => {
        const itemObj = {
          id: uuidV4(),
          label: typeof item === "string" ? item : "",
        };

        dispatch(addTags(itemObj));
        setFieldValue("tags", [...tags, itemObj]);
      });
    }
  };

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
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            options={availableTags}
            value={tags}
            onChange={handleTagsChange}
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
