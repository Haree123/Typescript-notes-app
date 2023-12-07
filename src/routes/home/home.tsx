import { FC, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import HomeNotes from "./components/home-notes";
import EditTagsDialog from "./components/tags-dialog";

const Home: FC = () => {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isDialogOpen ? (
        <EditTagsDialog
          handleDialogClose={handleDialogClose}
          open={isDialogOpen}
        />
      ) : null}
      
      <div className="py-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-3xl">Notes</p>
          <div className="flex items-center gap-5">
            <Button
              variant="outlined"
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Edit Tags
            </Button>
            <Button
              onClick={() => {
                navigate("/new");
              }}
              variant="contained"
            >
              Create
            </Button>
          </div>
        </div>

        <HomeNotes />
      </div>
    </>
  );
};

export default Home;
