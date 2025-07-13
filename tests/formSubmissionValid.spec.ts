import { generateValidFormData, hobbyTestCases } from "../date/formDate";
import { test } from "../fixtures/testFixtures";

test.describe("Form submission with valid data and various hobbies number", () => {
  hobbyTestCases.forEach(({ label, count }) => {
    test(`Should submit form successfully with ${label}`, async ({ formPage, resultPage }) => {
      const formData = generateValidFormData(count);
      await formPage.navigate();
      await formPage.fillAndSubmitForm(formData);
      if (formData.username) await resultPage.checkResultHeader(formData.username);
      await resultPage.checkResults(formData);
    });
  });
});
