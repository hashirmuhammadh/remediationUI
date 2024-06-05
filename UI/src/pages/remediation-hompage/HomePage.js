import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch_GET from "../../services/http/Get";
import "./HomePage.css";
/* import openProblemsIcon from './open_problems_icon.png';
import openProblemsImage from './open_problems_image.png';
import createRuleImage from './create_rule_image.png';
import manageRulesImage from './manage_rules_image.png';
import historyImage from './history_image.png'; */

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoading, error, data, getData } = useFetch_GET();
  console.log(data);
  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    getData("/audit-status");
  }, []);

  return (
    <div className="dashboard-container">
      <section className="dashboard">
        <h1>Remediation Dashboard</h1>
        <div className="open-problems">
          <div className="problem-count">
            {/* <img src={openProblemsIcon} alt="Open Problems Icon" /> */}
            <div className="count-details">
              <p className="count-number">
                <strong>Open Problems</strong>
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ margin: "1rem" }}>{data?.count}</h1>{" "}
                <i class="fa fa-exclamation" aria-hidden="true"></i>
              </div>
              {/* <p className="count-description">
                A problem is a set of related incidents
              </p> */}
            </div>
          </div>
          {/* <a href="#" className="arrow-link">
            &#x2192;
          </a> */}
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </div>
      </section>
      <section className="manage">
        <div className="manage-header">
          <h2>Manage</h2>
        </div>
        <div className="manage-options">
          <div
            className="option"
            onClick={() => {
              navigateTo("/new-rule");
            }}
          >
            {/* <img src={openProblemsImage} alt="Open Problems" /> */}
            <div className="option-text">
              <i class="fa fa-plus-square" aria-hidden="true"></i>
              <p className="option-title">Create Rules</p>
              <p className="option-description">
                Define rules to identify problems
              </p>
            </div>
          </div>
          <div
            className="option"
            onClick={() => {
              navigateTo("/recommendation");
            }}
          >
            {/* <img src={createRuleImage} alt="Create Rule" /> */}
            <div className="option-text">
              <i class="fa fa-pencil" aria-hidden="true"></i>
              <p className="option-title">Manage Rules</p>
              <p className="option-description">View and manage rules</p>
            </div>
          </div>
          <div
            className="option"
            onClick={() => {
              navigateTo("/new-problem");
            }}
          >
            {/* <img src={manageRulesImage} alt="Manage Rules" /> */}
            <div className="option-text">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
              <p className="option-title"> New Problems</p>
              <p className="option-description">View New Problems</p>
            </div>
          </div>
          <div
            className="option"
            onClick={() => {
              navigateTo("/audit");
            }}
          >
            {/* <img src={historyImage} alt="History" /> */}
            <div className="option-text">
              <i class="fa fa-table" aria-hidden="true"></i>
              <p className="option-title">Execution Records</p>
              <p className="option-description">View all remediations</p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="recent-activity"
        onClick={() => {
          navigateTo("/audit");
        }}
      >
        <h2>Recent Activity</h2>
        {data?.activity?.map((data, index) => (
          <div className="activity" key={index}>
            <div className="activity-details">
              <p className="activity-title">
                {data?.problemTitle} for {data?.serviceName}
              </p>
              <br />
              <p className="activity-description">
                Remidiator took <b>{data?.actionType.toLowerCase()}</b> action
                and currunt status is {data?.status}{" "}
              </p>
            </div>
            <p className="activity-time">{data?.ProblemDetectedAt}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
