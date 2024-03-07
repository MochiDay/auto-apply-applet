import express, { Request, Response, Application } from "express";

const app: Application = express();
app.use(express.json());

const port = 8762;

/**
 * @route POST /api/apply/lever
 * @desc Apply to Lever job postings
 * @access Public
 *
 * @param job_urls - Array of job URLs to apply to. For Lever job postings,
 * the URL should follow the format:
 * https://jobs.lever.co/{company}/{job_id}/apply
 */
app.post("/api/apply/lever", (req: Request, res: Response) => {
  const body = req.body;
  const { job_urls } = body;

  res.send(job_urls);
});

app.listen(port, () => {
  console.log(`Server is running  at http://localhost:${port}`);
});
