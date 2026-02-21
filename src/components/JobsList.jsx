import { useState } from "react";
import { applyToJob } from "../api";

export default function JobsList({ jobs, candidate }) {
  const [repoByJobId, setRepoByJobId] = useState({});
  const [statusByJobId, setStatusByJobId] = useState({});

  function handleRepoChange(jobId, value) {
    setRepoByJobId((prev) => ({ ...prev, [jobId]: value }));
  }

  async function handleSubmit(jobId) {
    const repoUrl = (repoByJobId[jobId] || "").trim();

    if (!candidate?.uuid || !candidate?.candidateId) {
      setStatusByJobId((prev) => ({
        ...prev,
        [jobId]: {
          loading: false,
          error: "Candidate data missing.",
          ok: false,
        },
      }));
      return;
    }
    if (!repoUrl) {
      setStatusByJobId((prev) => ({
        ...prev,
        [jobId]: { loading: false, error: "Repo URL is required.", ok: false },
      }));
      return;
    }

    try {
      setStatusByJobId((prev) => ({
        ...prev,
        [jobId]: { loading: true, error: "", ok: false },
      }));

      const res = await applyToJob({
        uuid: candidate.uuid,
        jobId,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl,
      });

      if (res?.ok === true) {
        setStatusByJobId((prev) => ({
          ...prev,
          [jobId]: { loading: false, error: "", ok: true },
        }));
      } else {
        setStatusByJobId((prev) => ({
          ...prev,
          [jobId]: {
            loading: false,
            error: res?.message || "Application failed",
            ok: false,
          },
        }));
      }
    } catch (e) {
      setStatusByJobId((prev) => ({
        ...prev,
        [jobId]: {
          loading: false,
          error: e.message || "Submit failed",
          ok: false,
        },
      }));
    }
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ color: "cyan" }}>Open positions</h2>

      {jobs.map((job) => {
        const status = statusByJobId[job.id] || {
          loading: false,
          error: "",
          ok: false,
        };

        return (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginTop: 12,
              display: "grid",
              gap: 10,
            }}
          >
            <div style={{ fontWeight: 700 }}>{job.title}</div>

            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="url"
                placeholder="https://github.com/loveragabriel/Nimble-Gravity-Challenge"
                value={repoByJobId[job.id] || ""}
                onChange={(e) => handleRepoChange(job.id, e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />

              <button
                onClick={() => handleSubmit(job.id)}
                disabled={status.loading || status.ok}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  cursor: status.loading ? "not-allowed" : "pointer",
                }}
              >
                {status.loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {status.ok && <div style={{ color: "green" }}>✅ Submitted</div>}
            {status.error && (
              <div style={{ color: "red" }}>⚠️ {status.error}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
