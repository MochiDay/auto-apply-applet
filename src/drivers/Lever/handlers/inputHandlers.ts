import { sleep } from "../../../utils/general.js";
import { Engine } from "../../../types/shared.js";

export const handleBasicInputWithOverwrite = async (
  engine: Engine,
  selector: string,
  targetAnswer: string | null
) => {
  if (targetAnswer === null) return;

  const input = await engine.page.$(selector);

  if (input) {
    await engine.cursor.click(selector);
    await sleep(50 + Math.random() * 50);
    await input.click({ clickCount: 3, delay: 50 + Math.random() * 30 });
    await input.press("Backspace");
  }

  await sleep(100 + Math.random() * 200);
  await engine.page.type(selector, targetAnswer);
  await sleep(150 + Math.random() * 100);
  await engine.page.evaluate(() => {
    // @ts-expect-error Property 'scrollBy' does not exist on type 'Window'
    window.scrollBy(0, 50 + Math.random() * 100);
  });
  console.log(`✅ Filled basic question: ${selector}`);
};
