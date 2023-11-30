import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./routes/home/home";
import Layout from "./components/layout";
import NewNote from "./routes/new/new-note";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewNote />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
