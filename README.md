# Auto Apply Applet

This repo has a collection of [puppeteer]("https://pptr.dev/") drivers that can be used to automate the process of applying to jobs on various job boards. The drivers are written in TypeScript and are served through an Express server that can be set up locally.

Currently, the following job boards are supported:

- Lever

We are working on adding more job boards and improving the existing drivers. If you would like to contribute, please refer to the [Contributing](#Contributing) section.

## Motivation

Applying to jobs can be a repetitive and time-consuming process where different listings require you to input the same information over and over again. This project aims to automate this process by creating a server that can take in a list of job URLs and a candidate's information and apply to the jobs on their behalf.

## Installation

Clone the repository and install the dependencies using npm.

```bash
npm install
```

## Usage

The default port is `8762` as defined in the `src/index.ts` file. To start the server, run the following command:

```bash
npm run dev
```

The server will start on `http://localhost:8762`. You can access the drivers by sending a `POST` request to the server with the following payload:

```json
{
  "job_urls": [
    "https://jobs.lever.co/Voxel/87e2acda-8b4d-4fd9-aafe-2b606f0e3d1f/apply",
    "https://jobs.lever.co/genesistherapeutics/6caa03ec-897a-489c-a8f2-e29b0c9b0c32/apply"
  ],
  "candidate": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "youremail@gmail.com",
    "phone": "1234567890",
    "linkedin_url": "https://www.linkedin.com/in/johndoe",
    "resume_link": "https://www.yourwebsite.com/resume.pdf",
    "future_sponsership_required": true,
    "current_company": "Your Current Company",
    "auth_to_work_in_usa": true
  }
}
```

These are the fields that are required to apply to a job. For more fields, please refer to `Candidate` type in the `src/types/shared.ts` file.

## Contributing

If you would like to contribute, please follow the steps below:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make the changes
4. Commit the changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/new-feature`)
6. Create a pull request
