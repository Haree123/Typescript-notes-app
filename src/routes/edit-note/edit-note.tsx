import { FC } from "react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import NewNoteForms from "../new-note/components/new-note-forms";

import { RootState, note } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../../redux/reducers/note-reducers";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  markdown: yup.string().required("Markdown is Required"),
});

const EditNote: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { notesWithTags } = useSelector((state: RootState) => state.note);

  const note = notesWithTags?.find((item) => item.id === id);

  const initialValues: note = {
    id: note?.id || "",
    title: note?.title || "",
    markdown: note?.markdown || "",
    tags: note?.tags || [],
  };

  const handleSubmit = (values: note) => {
    dispatch(
      updateNote({
        id: values.id,
        markdown: values.markdown,
        title: values.title,
        tags: values.tags,
      })
    );

    navigate("/");
  };

  return (
    <div className="pt-3">
      <p className="font-semibold text-3xl">Edit Note</p>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
      >
        {() => {
          return <NewNoteForms isEdit={true} />;
        }}
      </Formik>
    </div>
  );
};

export default EditNote;
