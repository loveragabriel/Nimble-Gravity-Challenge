export default function CandidateCard({ candidate, loading, error }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{color:"skyblue"}}>Candidate</h2>

      {loading && <p>Loading candidate...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {candidate &&
        Object.entries({
          Name: `${candidate.firstName} ${candidate.lastName}`,
          Email: candidate.email,
          UUID: candidate.uuid,
          "Candidate ID": candidate.candidateId,
          "Application ID": candidate.applicationId,
        }).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
    </div>
  );
}