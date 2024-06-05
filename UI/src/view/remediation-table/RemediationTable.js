import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import useFetch_GET from "../../services/http/Get";
import "./RemediationTable.css";

const RemediationTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { isLoading, error, data: apiData, getData } = useFetch_GET();

  useEffect(() => {
    getData("/problems_with_remediations");
  }, []);
  useEffect(() => {
    setData(apiData);
    setFilteredData(apiData);
  }, [apiData]);

  const handleServiceFilterChange = (event) => {
    const value = event.target.value;
    setFilteredData(
      value ? data.filter((item) => item.ServiceName === value) : data
    );
  };

  return (
    <div>
      <div className="table-header">
        <div className="table-name-description">
          <h2 className="table-name">Remediation Records</h2>
          <p className="table-description">
            View the details of remediation actions.
          </p>
        </div>
        {/* <div className="filters">
          <select
            id="remediation-filter"
            onchange="handleServiceFilterChange()"
          >
            <option value="">Filter by Service Name</option>
          </select>
          <select id="status-filter" onchange={handleStatusFilterChange()}>
            <option value="">Filter by Problem</option>
            <option value="Process unavailable">Process unavailable</option>
          </select>
        </div> */}
      </div>
      <div className="container">
        <table id="execution-table">
          <thead>
            <tr>
              <th>ProblemId</th>
              <th>Problem Title</th>
              <th>Sub-problem</th>
              <th>Resolution Script</th>
              <th>Recommendation</th>
              <th>Create Date</th>
              <th>Last Update</th>
              <th>Owner</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item) => (
              <tr key={item.id}>
                <td>{item.problemId}</td>
                <td>{item.problemTitle}</td>
                <td>{item.subProblemTitle || "N/A"}</td>
                <td>{item.scriptPath}</td>
                <td>{item.recommendationText}</td>
                <td>{item.createdAt}</td>
                <td>{item.lastUpdateAt}</td>
                <td>{item.Owner} John</td>
                <td>
                  <button className="edit-button">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RemediationTable;
