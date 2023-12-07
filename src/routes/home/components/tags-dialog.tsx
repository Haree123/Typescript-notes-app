import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../types/types";
import { deleteTags, updateTag } from "../../../redux/reducers/note-reducers";

type EditTagsDialog = {
  handleDialogClose: () => void;
  open: boolean;
};

const EditTagsDialog = ({ handleDialogClose, open }: EditTagsDialog) => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state: RootState) => state.note);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Tags</DialogTitle>
      <DialogContent dividers>
        {tags.map((tag) => {
          return (
            <div
              className="flex mb-2 items-center justify-between gap-3 w-full"
              key={tag.id}
            >
              <TextField
                size="small"
                sx={{ width: "88%", overflow: "hidden", whiteSpace: "nowrap" }}
                value={tag.label ? tag.label : ""}
                onChange={(e) => {
                  dispatch(updateTag({ id: tag.id, label: e.target.value }));
                }}
              />
              {/* <div className="border rounded-md w-11/12 p-3 overflow-hidden whitespace-nowrap text-ellipsis">
                {tag.label}
              </div> */}
              <IconButton
                onClick={() => {
                  dispatch(
                    deleteTags({
                      id: tag.id,
                      label: tag.label,
                    })
                  );
                }}
              >
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTagsDialog;
