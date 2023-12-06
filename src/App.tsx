import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import Home from "./routes/home/home";
import Layout from "./components/layout";
import NewNote from "./routes/new-note/new-note";
import ViewNote from "./routes/view-note/view-note";

import { store } from "./redux/store/redux-store";
import { RootState } from "./types/types";

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
              <Route path="edit" />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

const LayoutOutlet = () => {
  const { id } = useParams();
  const notes = useSelector((state: RootState) => state.note.notes);

  const isExist = notes.find((item) => item.id === id);

  if (!isExist) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
