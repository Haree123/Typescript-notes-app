import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import Home from "./routes/home/home";
import Layout from "./components/layout";
import NewNote from "./routes/new-note/new-note";
import EditNote from "./routes/edit-note/edit-note";
import ViewNote from "./routes/view-note/view-note";

import { store } from "./redux/store/redux-store";
import { RootState, note } from "./types/types";

const LayoutOutlet = () => {
  const { id } = useParams();
  const { notes, notesWithTags } = useSelector(
    (state: RootState) => state.note
  );

  const noteIndex = notes.findIndex((item) => item.id === id);
  const note =
    noteIndex !== -1 ? (notesWithTags ? notesWithTags[noteIndex] : []) : [];

  if (noteIndex === -1) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={note} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewNote />} />

            <Route path="/:id" element={<LayoutOutlet />}>
              <Route index element={<ViewNote />} />
              <Route path="edit" element={<EditNote />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

export const useNote = () => {
  return useOutletContext<note>();
};
