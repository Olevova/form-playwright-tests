import { generateValidFormData, hobbyTestCases } from "../date/formDate";
import { test } from "../fixtures/testFixtures";

const formData = generateValidFormData(1);

test.describe("Form UI/UX tests", () => {
  test("Should display correct ARIA structure on initial load", async ({ formPage }) => {
    await formPage.navigate();
    await formPage.expectFormPageIsVisibleViaAriaSnapshot();
  });

  test("Should reset all form fields after reload", async ({ formPage }) => {
    await formPage.navigate();
    await formPage.fillAndSubmitForm(formData, { submit: false, loader: false });
    await formPage.page.reload();
    await formPage.expectFormPageIsVisibleViaAriaSnapshot();
    await formPage.checkFormFieldAreEmpty();
  });

  test("Should enable submit button on initial page load", async ({ formPage }) => {
    await formPage.navigate();
    await formPage.checkSubmitBtnEnabled();
  });
});
