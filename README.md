# Nimble Gravity – Challenge

This project was developed as part of the **Nimble Gravity Junior Fullstack Developer** application process. It is a small React application built with Vite that connects to the provided API to:

* Retrieve candidate information using an email address.
* Fetch the list of open job positions.
* Submit a GitHub repository URL to apply to a selected job.
---

## Features

### Candidate Data
The application calls `GET /api/candidate/get-by-email`. It displays:
* Full name
* Email
* UUID
* Candidate ID
* Application ID

*Loading and error states are handled in the UI.*

### Open Positions
The application calls `GET /api/jobs/get-list` to retrieve and display the list of available job positions. Each position includes:
* Job title
* Input field for a GitHub repository URL
* Submit button

### Apply to Job
When the user clicks **Submit**, the app calls `POST /api/candidate/apply-to-job` with the following JSON body:

```json
{
  "uuid": "candidate uuid",
  "jobId": "job id",
  "candidateId": "candidate id",
  "repoUrl": "github repo url"
}
```

## The UI behavior:

* Shows loading state while submitting.

* Displays success confirmation (ok: true).

* Displays API error messages when necessary.

## Project Structure
```
src/
  api.js
  App.jsx
  components/
    CandidateCard.jsx
    JobsList.jsx
```
* App.jsx: Handles data fetching and state management

* CandidateCard.jsx: Renders candidate information

* JobsList.jsx: Renders job positions and handles job submissions

* api.js: Centralizes API calls

