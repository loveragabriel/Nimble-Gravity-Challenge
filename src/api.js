const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net"

// Get Candidate Data 
export async function getCandidateByEmail(email) {
    const response = await fetch(
        `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Error fetching data candidate")
    }

    return data;

}

// Get List of Jobs 
export async function getJobsList() {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Error getting list of Jobs");
    }

    return data;

}

// Apply to Job (POST)
export async function applyToJob({ uuid, jobId, candidateId, applicationId, repoUrl }) {
    const payload = {
        uuid: String(uuid).trim(),
        jobId: String(jobId).trim(),
        candidateId: String(candidateId).trim(),
        applicationId: String(applicationId).trim(),
        repoUrl: String(repoUrl).trim()
    };

    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("fieldErrors:", JSON.stringify(data?.details?.fieldErrors, null, 2));
        throw new Error(data?.message || "Error applying to job");
    }

    return data;
}