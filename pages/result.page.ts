import { expect, Locator, Page } from "@playwright/test";
import { FormData } from "../types/types";

export class ResultPage {
  readonly page: Page;
  readonly resultPageHeader: Locator;
  readonly genderRow: Locator;
  readonly hobbiesRow: Locator;
  readonly timeRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultPageHeader = page.getByRole("heading");
    this.genderRow = page.getByRole("row").filter({ hasText: "Gender" }).locator("td");
    this.hobbiesRow = page.getByRole("row").filter({ hasText: "Hobbies" }).locator("td");
    this.timeRow = page.getByRole("row").filter({ hasText: "Time" }).locator("td");
  }

  async checkResultHeader(username: string | number) {
    await expect(this.resultPageHeader).toHaveText(`Greetings, ${username}`);
  }

  async checkGenderRow(gender: string) {
    await expect(this.genderRow).toHaveText(`${gender}`);
  }

  async checkHobbiesRow(hobbies: string[] | string) {
    const expectedString = Array.isArray(hobbies) ? hobbies.join(",") : hobbies;
    console.log(expectedString);

    await expect(this.hobbiesRow).toHaveText(expectedString);
  }

  async checkTimeRow(time: string) {
    await expect(this.timeRow).toHaveText(`${time}`);
  }

  async checkResults(data: FormData) {
    if (data.username) await this.checkResultHeader(String(data.username));
    if (data.gender) await this.checkGenderRow(data.gender);
    if (data.hobbie) await this.checkHobbiesRow(data.hobbie);
    if (data.time) await this.checkTimeRow(data.time);
  }
}
