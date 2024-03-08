import { GhostCursor } from "ghost-cursor";
import { Browser, Page } from "puppeteer";

export interface Engine {
  page: Page;
  cursor: GhostCursor;
  browser: Browser;
  candidate: Candidate;
  job_url: string;
  driver: JobBoardDriver;
  debug?: boolean;
}

export enum JobBoardDriver {
  LEVER = "lever",
}

export interface Candidate {
  first_name: string;
  last_name: string;
  resume_link: string;
  linkedin_url: string;
  email: string;
  phone: string;
  future_sponsership_required: boolean;
  current_company: string;
  auth_to_work_in_usa: boolean;
  type_of_sponsership: string | null;
}
