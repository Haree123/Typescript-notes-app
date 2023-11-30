import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="py-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-3xl">Notes</p>
        <div className="flex items-center gap-5">
          <Button variant="outlined">Edit Tags</Button>
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
    </div>
  );
};

export default Home;
