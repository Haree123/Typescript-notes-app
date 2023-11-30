import { Formik } from "formik";

import NewNoteForms from "./components/new-note-forms";

const initialValues = {
  title: "",
  tags: "",
  body: "",
};

const NewNote = () => {
  const handleSubmit = () => {};

  return (
    <div className="pt-3">
      <p className="font-semibold text-3xl">New Note</p>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => <NewNoteForms />}
      </Formik>
    </div>
  );
};

export default NewNote;
