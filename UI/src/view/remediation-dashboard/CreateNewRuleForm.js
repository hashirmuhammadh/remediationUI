import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useFetch_POST from "../../services/http/Post";
import "./RemidiationForm.css";

const CreateNewRuleForm = () => {
  const { isLoading, error, data, postData } = useFetch_POST();
  const problem = useSelector((state) => state.problem);
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    resolutionScript: Yup.string().required("This feild is required"),
    recommendation: Yup.string().required("This feild is required"),
    serviceName: Yup.string().required("This feild is required"),
    subProblemTitle: Yup.string().required("This feild is required"),
    problemTitle: Yup.string().required("This feild is required"),
  });

  const initialValues = {
    problemTitle: "",
    subProblemTitle: "",
    resolutionScript: "",
    recommendation: "",
    serviceName: "",
  };

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.setValues({
        problemTitle: "",
        subProblemTitle: "",
        resolutionScript: "",
        recommendation: "",
        serviceName: "",
      });
    }
  }, [problem]);

  const handleSubmit = async (values) => {
    values["problemId"] = problem?.problemId;
    values["status"] = "resolved";
    console.log(values);
    postData(`/save_problem`, values);
    if (data.status === 201) navigate("/recommendation");
  };

  return (
    <div className="middle-panel">
      <div className="table-header">Add New Recommendation</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="middle-panel-text">
              <p className="recommendation-title">
                <strong>Problem Title: </strong>
                <Field
                  className="input-box"
                  name="problemTitle"
                  type="text"
                  title="Problem title"
                />
                <ErrorMessage
                  name="problemTitle"
                  component="div"
                  className="error"
                />
              </p>
              <p className="recommendation-title">
                <strong>Sub-Problem: </strong>
                <Field
                  className="input-box"
                  name="subProblemTitle"
                  type="text"
                  title="Sub-Problem"
                />
                <ErrorMessage
                  name="subProblemTitle"
                  component="div"
                  className="error"
                />
              </p>
              <p className="recommendation-title">
                <strong>Service Name: </strong>
                <Field
                  className="input-box"
                  name="serviceName"
                  type="text"
                  title="Service-Name"
                />
                <ErrorMessage
                  name="serviceName"
                  component="div"
                  className="error"
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

export default CreateNewRuleForm;
