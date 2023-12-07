import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useNote } from "../../App";
import { deleteNote } from "../../redux/reducers/note-reducers";

const ViewNote = () => {
  const dispatch = useDispatch();
  const note = useNote();
  const navigate = useNavigate();

  const { id, markdown, title, tags } = note || {};

  return (
    <div className="py-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-3xl">{title}</p>
        <div className="flex items-center gap-3">
          <Button
            variant="outlined"
            onClick={() => {
              navigate(`/${id}/edit`);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(deleteNote({ id }));
              navigate("/");
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            variant="contained"
          >
            Back
          </Button>
        </div>
      </div>

      <div className="mt-5 w-3/4 flex gap-2">
        {tags?.map((item, tagIndex) => {
          return (
            <div
              key={tagIndex}
              className="bg-primary rounded-md text-white px-3 py-0.5 text-sm font-semibold"
            >
              {item.label}
            </div>
          );
        })}
      </div>

      <div className="mt-10 font-semibold">Body:</div>
      <div className="w-full py-4">{markdown}</div>
    </div>
  );
};

export default ViewNote;
