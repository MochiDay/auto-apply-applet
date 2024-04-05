import { DownloaderHelper } from "node-downloader-helper";

import * as fs from "fs";
import { join } from "path";
import { Candidate } from "../types/shared.js";
import { DirName } from "./general.js";

export async function downloadResume(candidate: Candidate) {
  console.log("Downloading resume...");

  const url = candidate.resume_link;

  const filename =
    url.split("/").pop() ||
    `${candidate.last_name}_${candidate.first_name}_resume.pdf`;
  const userResumeDirectory = join(DirName, candidate.first_name);
  const filePath = join(userResumeDirectory, filename);
  console.log(filePath);
  if (!fs.existsSync(userResumeDirectory)) {
    fs.mkdirSync(userResumeDirectory, { recursive: true });
  }

  const dl = new DownloaderHelper(url, userResumeDirectory);

  dl.on("end", () => console.log("✅ Resume downloaded"));
  dl.on("error", (err: any) => console.log("❌ Resume download failed", err));
  await dl.start().catch((err: Error) => {
    throw err;
  });

  return filePath;
}
