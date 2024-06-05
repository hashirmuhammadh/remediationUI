import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/topbar/top-bar.js";

import { useSelector } from "react-redux";
import AlertComponent from "./components/alert/Alert.js";
import Progressbar from "./components/progress/Progressbar.js";
import HomePage from "./pages/remediation-hompage/HomePage.js";

const Dashboard = lazy(() => import("./view/remediation-dashboard/Index.js"));
const ExecutionHistory = lazy(() =>
  import("./view/remediation-execution-records/execution-dashboard.js")
);
const ProblemDetail = lazy(() =>
  import("./view/problem-detail/ProblemDetail.js")
);
const CreateNewRuleForm = lazy(() =>
  import("./view/remediation-dashboard/CreateNewRuleForm.js")
);
const RemediationTable = lazy(() =>
  import("./view/remediation-table/RemediationTable.js")
);



function App() {
  let loading = useSelector((state) => state.loading.loading);
  let alert = useSelector((state) => state.alert);
  console.log(loading);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
          <TopBar />
          {loading && (
            <div className="progress-bar-container">
              <Progressbar />
            </div>
          )}
          {alert.open && (
            <div className="alert-container">
              <AlertComponent />
            </div>
          )}

          <Routes>
            <Route
              exact
              path="/audit"
              name="Audit"
              element={<ExecutionHistory />}
            />

            <Route
              exact
              path="/recommendation"
              name="Edit-Recommendation"
              element={<RemediationTable />}
            />
            <Route
              exact
              path="/:PID/:ExecutionId"
              name="Problem-Detail"
              element={<ProblemDetail />}
            />
            <Route
              exact
              path="/new-rule"
              name="Create-New-Rule"
              element={<CreateNewRuleForm />}
            />
            <Route
              exact
              path="/new-problem"
              name="Home"
              element={<Dashboard />}
            />
            <Route exact path="/" name="Home" element={<HomePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
