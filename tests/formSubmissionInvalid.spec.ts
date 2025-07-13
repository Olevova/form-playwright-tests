import { test } from "../fixtures/testFixtures";
import { generateInvalidFormData, invalidFields } from "../date/formDate";

test.describe("Form submission with invalid data", () => {
  for (const invalidField of invalidFields) {
    test(`Should not submit form when '${invalidField}' is missing`, async ({ formPage }) => {
      const formData = generateInvalidFormData(invalidField);
      await formPage.navigate();
      await formPage.fillAndSubmitForm(formData, { loader: false });
      await formPage.validateRequeredFormFields(formData);
    });
  }

  test("Should show validation error on first required field if form is submitted empty", async ({ formPage }) => {
    await formPage.navigate();
    await formPage.submitForm();
    await formPage.expectFormFieldInvalid(formPage.userNameInput);
  });
});
