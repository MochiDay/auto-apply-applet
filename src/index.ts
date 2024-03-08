import express, { Request, Response, Application } from "express";
import { init } from "./drivers/init.js";
import { JobBoardDriver } from "./types/shared.js";

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
 *
 * @param candidate - Candidate information to use for applying to the job
 * see {@link Candidate}
 */
app.post("/api/apply/lever", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { job_urls, candidate } = body;
    for (const job_url of job_urls) {
      const engine = await init(JobBoardDriver.LEVER, candidate, job_url);
    }
    res.send(job_urls);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running  at http://localhost:${port}`);
});
