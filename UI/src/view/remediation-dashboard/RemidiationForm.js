import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import useFetch_POST from "../../services/http/Post";
import "./RemidiationForm.css";

const RemidiationForm = () => {
  const problem = useSelector((state) => state.problem);
  const formikRef = useRef(null);
  const { isLoading, error, data, postData } = useFetch_POST();

  const validationSchema = Yup.object().shape({
    resolutionScript: Yup.string().required("Resolution Script is required"),
    recommendation: Yup.string().required("Recommendation is required"),
  });

  const initialValues = {
    problemTitle: problem?.problemTitle || "",
    subProblemTitle: problem?.subProblemTitle || "",
    resolutionScript: "",
    recommendation: "",
  };

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setValues({
        problemTitle: problem?.problemTitle || "",
        subProblemTitle: problem?.subProblemTitle || "",
        resolutionScript: "",
        recommendation: "",
      });
    }
  }, [problem]);

  const handleSubmit = async (values) => {
    values["problemId"] = problem.problemId;
    values["serviceName"] = problem.serviceName;
    console.log(values);
    postData(`/insert_recommendation`, values);
    // window.location.reload();
  };

  return (
    <div className="right-panel">
      <div className="table-header">Add New Recommendation</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <p className="recommendation-title">
                <strong>Problem Title: </strong>
                <Field
                  className="input-box"
                  name="problemTitle"
                  type="text"
                  id="problem-title-input"
                  title="Problem title"
                  readOnly
                />
              </p>
              <p className="recommendation-title">
                <strong>Sub-Problem: </strong>
                <Field
                  className="input-box"
                  name="subProblemTitle"
                  type="text"
                  id="sub-problem-input"
                  title="Sub-Problem"
                  readOnly
                />
              </p>
              <p className="recommendation-title">
                <strong>Resolution Script: </strong>
                <Field
                  className="input-box"
                  name="resolutionScript"
                  type="text"
                  title="Resolution script"
                />
                <ErrorMessage
                  name="resolutionScript"
                  component="div"
                  className="error"
                />
              </p>
              <p className="recommendation-title">
                <strong>Recommendation: </strong>
                <Field
                  className="input-box"
                  name="recommendation"
                  type="text"
                  title="Recommendation"
                />
                <ErrorMessage
                  name="recommendation"
                  component="div"
                  className="error"
                />
              </p>
            </div>
            <button type="submit" className="button" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RemidiationForm;
