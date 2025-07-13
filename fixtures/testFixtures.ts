import { test as base, expect } from "@playwright/test";
import { ResultPage } from "../pages/result.page";
import { FormPage } from "../pages/form.page";

type testFixture = {
  formPage: FormPage;
  resultPage: ResultPage;
};

export const test = base.extend<testFixture>({
  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await use(formPage);
  },

  resultPage: async ({ page }, use) => {
    const resultPage = new ResultPage(page);
    await use(resultPage);
  },
});

export { expect } from "@playwright/test";
