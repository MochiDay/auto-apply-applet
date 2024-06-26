import { createCursor, getRandomPagePoint } from "ghost-cursor";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import UserAgent from "user-agents";
import { goToLinkWithRetry } from "../utils/general.js";
import { JobBoardDriver, Engine, Candidate } from "../types/shared.js";

export const init = async (
  driver: JobBoardDriver,
  candidate: Candidate,
  job_url: string,
  debug?: boolean,
  headless = true
): Promise<Engine> => {
  try {
    // @ts-ignore
    puppeteer.use(StealthPlugin());

    // @ts-ignore
    const browser = await puppeteer.launch({
      headless,
      ignoreHTTPSErrors: true,
      devtools: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    const agent = new UserAgent({
      deviceCategory: "desktop",
    });
    const userAgent = agent.random().toString();
    const UA =
      userAgent ||
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36";

    await page.setUserAgent(UA);

    // @ts-ignore
    const ua = await page.evaluate(() => navigator.userAgent);
    console.log(ua);

    await page.setViewport({
      width: 1920 + Math.floor(Math.random() * 100),
      height: 5000 + Math.floor(Math.random() * 100),
    });

    await page.evaluateOnNewDocument(() => {
      // @ts-expect-error Property 'webdriver' does not exist on type 'Navigator'
      delete navigator.__proto__.webdriver;
    });

    const cursor = createCursor(page, await getRandomPagePoint(page));

    await page.setDefaultNavigationTimeout(0);
    await goToLinkWithRetry(page, job_url);

    return { page, cursor, browser, candidate, driver, job_url, debug };
  } catch (error) {
    throw new Error(`❌ Error initializing browser: ${error}`);
  }
};
