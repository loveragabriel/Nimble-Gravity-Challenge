import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import ngLogo from "/ng.svg";
import "./App.css";
import { getCandidateByEmail, getJobsList } from "./api";
import CandidateCard from "./components/CandidateCard";
import JobsList from "./components/JobsList";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [candidateLoading, setCandidateLoading] = useState(false);
  const [candidateError, setCandidateError] = useState("");

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");

  const email = "loveragabriel20@gmail.com";

  useEffect(() => {
    async function loadCandidate() {
      try {
        setCandidateLoading(true);
        setCandidateError("");
        const data = await getCandidateByEmail(email);
        setCandidate(data);
      } catch (e) {
        setCandidateError(e.message);
      } finally {
        setCandidateLoading(false);
      }
    }
    loadCandidate();
  }, [email]);

  useEffect(() => {
    async function loadJobs() {
      try {
        setJobsLoading(true);
        setJobsError("");
        const data = await getJobsList();
        setJobs(data);
      } catch (e) {
        setJobsError(e.message);
      } finally {
        setJobsLoading(false);
      }
    }
    loadJobs();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={ngLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Nimble Gravity - Challenge</h1>
      <div style={{ textAlign: "left" }}>
        <CandidateCard
          candidate={candidate}
          loading={candidateLoading}
          error={candidateError}
        />
        <JobsList
          jobs={jobs}
          candidate={candidate}
          loading={jobsLoading}
          error={jobsError}
        />
      </div>
    </>
  );
}

export default App;
