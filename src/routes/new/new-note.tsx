import { FC } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import * as yup from "yup";

import NewNoteForms from "./components/new-note-forms";

import { note } from "../../types/types";
import { useDispatch } from "react-redux";
import { createNote } from "../../redux/reducers/note-reducers";

const initialValues: note = {
  id: "",
  title: "",
  markdown: "",
  tags: [],
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  markdown: yup.string().required("Markdown is Required"),
});

const NewNote: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: note) => {
    dispatch(
      createNote({
        id: uuidV4(),
        markdown: values.markdown,
        title: values.title,
        tags: [],
      })
    );

    navigate("/");
  };

  return (
    <div className="pt-3">
      <p className="font-semibold text-3xl">New Note</p>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnMount={false}
      >
        {() => {
          return <NewNoteForms />;
        }}
      </Formik>
    </div>
  );
};

export default NewNote;
