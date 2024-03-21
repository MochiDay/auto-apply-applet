import { Engine, JobBoardDriver } from "../types/shared.js";
import { downloadResume } from "../utils/resume.js";
import { fillLeverApplication } from "./Lever/fillLeverApplication.js";
import fs from "fs";
import { LeverFillQuestionError } from "./Lever/types/types.js";
import { submitLeverApplication } from "./Lever/submitLeverApplication.js";

/**
 * Apply to job using the given engine
 *
 * 1. Download resume
 * 2. Fill all the job application questions
 * 3. Submit application
 *
 * No matter what happens, clean up the resume file
 */
export const apply = async (engine: Engine) => {
  let resumePath;
  try {
    resumePath = await downloadResume(engine.candidate);
    await fillApplication(engine, resumePath);
    await submitApplication(engine);
  } catch (error) {
    console.error(`❌ Error applying to job ${engine.job_url}`);
    if (error instanceof LeverFillQuestionError) {
      console.error(`😵‍💫😵‍💫😵‍💫 User action required`);
    }
    throw error;
  } finally {
    if (resumePath && fs.existsSync(resumePath)) {
      console.log("🧹 Cleaning up resume file...");
      fs.unlinkSync(resumePath);
    }
  }
};

// -------------------------------------------
// ------------------ utils ------------------
// -------------------------------------------

const fillApplication = async (engine: Engine, resumePath: string) => {
  switch (engine.driver) {
    case JobBoardDriver.LEVER:
      await fillLeverApplication(engine, resumePath);
      break;
    default:
      console.log("Driver not found");
      throw new Error("❌ Driver not found");
  }
};

const submitApplication = async (engine: Engine) => {
  switch (engine.driver) {
    case JobBoardDriver.LEVER:
      await submitLeverApplication(engine);
      break;
    default:
      console.log("Driver not found");
      throw new Error("❌ Driver not found");
  }
};
