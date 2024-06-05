import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch_GET from "../../services/http/Get";
import ProblemForm from "./ProblemList";
import RemidiationForm from "./RemidiationForm";

const Dashboard = () => {
  const [problemData, setProblemData] = useState([]);
  const [handleSelectData, setHandleSelectData] = useState();
  const { isLoading, error, data, getData } = useFetch_GET();

  useEffect(() => {
    setProblemData(data);
  }, [data]);
  const navigate = useNavigate();
  const handleSubmit = (value) => {
    console.log(value);
    setHandleSelectData(value);
  };

  useEffect(() => {
    getData("/get_new_problems");
  }, []);
  return (
    <div>
      <div>
        
        <button
          id="createRuleButton"
          className="createrulebutton"
          onClick={() => {
            navigate("/new-rule");
          }}
        >Create New Rule
        </button>
        <div className="container">
          <div className="left-panel">
            <div className="table-header">Problem List</div>
            <ProblemForm data={problemData} onSubmit={handleSubmit} />
          </div>
          <RemidiationForm data={handleSelectData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
