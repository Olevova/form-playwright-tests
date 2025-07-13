import { generateValidFormData } from "../date/formDate";
import { test, expect } from "../fixtures/testFixtures";

const formData = generateValidFormData(1);
const formDataBackArrow = generateValidFormData(2);

test.describe("Form, Result pages navigation behavior", () => {
  test("Should redirect to form page when result page is reloaded", async ({ formPage, resultPage }) => {
    await formPage.navigate();
    await formPage.fillAndSubmitForm(formData);
    await formPage.expectFormFieldsHaveValues(formData);
    if (formData.username) await resultPage.checkResultHeader(formData.username);
    await resultPage.checkResults(formData);
    await resultPage.page.reload();
    await formPage.expectFormPageIsVisibleViaAriaSnapshot();
  });

  test("Should return to pre-filled form via browser back button and show correct header", async ({ formPage, resultPage }) => {
    await formPage.navigate();
    await formPage.fillAndSubmitForm(formDataBackArrow);
    await resultPage.checkResults(formDataBackArrow);
    await resultPage.page.goBack();
    await formPage.expectFormHeaderIsVisible();
  });

  test("Should return to pre-filled form via browser back button and show correct username", async ({ formPage, resultPage }) => {
    await formPage.navigate();
    await formPage.fillAndSubmitForm(formDataBackArrow);
    await resultPage.checkResults(formDataBackArrow);
    await resultPage.page.goBack();
    await formPage.expectFormFieldHaveValue(formPage.userNameInput, String(formDataBackArrow.username));
  });

  test("Should not allow direct navigation to result page (404 expected)", async ({ request }) => {
    const res = await request.get("/result");
    console.log(res.status());
    expect(res.status()).toBe(404);
  });
});
