import { Page, Locator, expect } from "@playwright/test";
import { checkBoxChecking, selectOptionInDropDown } from "../utils/commonUtils";
import { FormData } from "../types/types";
import { FORM_PAGE_ARIA_SNAPSHOT } from "../snapshots/snapshots";

export class FormPage {
  readonly page: Page;
  readonly formHeader: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly genderMaleRadioBtn: Locator;
  readonly genderFemaleRadioBtn: Locator;
  readonly hobbyReadingCheckbox: Locator;
  readonly hobbySportsCheckbox: Locator;
  readonly hobbyMusicCheckbox: Locator;
  readonly timeDropDownElement: Locator;
  readonly submitFormBtn: Locator;
  readonly loaderElement: Locator;
  readonly formPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formHeader = page.getByRole("heading", { name: "Your average form" });
    this.userNameInput = page.getByRole("textbox", { name: "Username:" });
    this.passwordInput = page.getByRole("textbox", { name: "Password:" });
    this.genderMaleRadioBtn = page.getByRole("radio", { name: "Male", exact: true });
    this.genderFemaleRadioBtn = page.getByRole("radio", { name: "Female", exact: true });
    this.hobbyReadingCheckbox = page.getByRole("row", { name: "Reading" }).getByRole("checkbox");
    this.hobbySportsCheckbox = page.getByRole("row", { name: "Sports" }).getByRole("checkbox");
    this.hobbyMusicCheckbox = page.getByRole("row", { name: "Music" }).getByRole("checkbox");
    this.timeDropDownElement = page.getByLabel("Time:");
    this.submitFormBtn = page.getByRole("button", { name: "Submit" });
    this.loaderElement = page.locator(".loading-animation");
    this.formPage = page.locator("body");
  }

  async navigate(path: string = "/") {
    await this.page.goto(path);
  }

  async expectFormPageIsVisibleViaAriaSnapshot() {
    await expect(this.formPage).toMatchAriaSnapshot(FORM_PAGE_ARIA_SNAPSHOT);
  }

  async expectFormHeaderIsVisible() {
    await expect(this.formHeader).toBeVisible();
    await expect(this.formHeader).toHaveText("Your average form");
  }

  async fillUsername(username: string) {
    await this.userNameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async selectGender(gender: "Male" | "Female") {
    gender === "Male" ? await this.genderMaleRadioBtn.check() : await this.genderFemaleRadioBtn.check();
  }

  async selectHobbies(hobbies: string[] | string) {
    const hobbiesArray = Array.isArray(hobbies) ? hobbies : [hobbies];
    for (const hobby of hobbiesArray) {
      await checkBoxChecking(this.page, hobby);
    }
  }

  async selectTime(time: string) {
    await selectOptionInDropDown(this.timeDropDownElement, time);
  }

  async expectLoaderVisible() {
    await expect(this.loaderElement).toBeVisible();
  }

  async expectFormFieldInvalid(field: Locator) {
    const elIsInvalid = await field.evaluate((el: HTMLFormElement) => !el.validity.valid);
    expect(elIsInvalid, `${field} is expected to be invalid`).toBeTruthy();
  }

  async fillForm(data: FormData) {
    if (data.username) await this.fillUsername(String(data.username));
    if (data.password) await this.fillPassword(String(data.password));
    if (data.gender) await this.selectGender(data.gender);
    if (data.hobbie) await this.selectHobbies(data.hobbie);
    if (data.time) await this.selectTime(data.time);
  }

  async submitForm() {
    await this.submitFormBtn.click();
  }

  async fillAndSubmitForm(data: FormData, obj: { submit?: boolean; loader?: boolean } = { submit: true, loader: true }) {
    await this.fillForm(data);
    if (obj.submit) await this.submitForm();
    if (obj.loader) await this.expectLoaderVisible();
  }

  async validateRequeredFormFields(data: FormData) {
    if (!data.username) await this.expectFormFieldInvalid(this.userNameInput);
    if (!data.password) await this.expectFormFieldInvalid(this.passwordInput);
    if (!data.gender) await this.expectFormFieldInvalid(this.genderMaleRadioBtn);
    if (!data.time) await this.expectFormFieldInvalid(this.timeDropDownElement);
  }

  async checkSubmitBtnEnabled() {
    await expect(this.submitFormBtn).toBeEnabled();
  }

  async checkFormFieldAreEmpty() {
    await expect(this.userNameInput).toBeEmpty();
    await expect(this.passwordInput).toBeEmpty();
    await expect(this.genderMaleRadioBtn).not.toBeChecked();
    await expect(this.genderFemaleRadioBtn).not.toBeChecked();
    await expect(this.hobbyMusicCheckbox).not.toBeChecked();
    await expect(this.hobbyReadingCheckbox).not.toBeChecked();
    await expect(this.hobbySportsCheckbox).not.toBeChecked();
    await expect(this.timeDropDownElement).toHaveValue("");
  }

  async expectFormFieldsHaveValues(data: FormData) {
    if (data.username) {
      await expect(this.userNameInput).toHaveValue(String(data.username));
    }
    if (data.password) {
      await expect(this.passwordInput).toHaveValue(String(data.password));
    }
    if (data.gender === "Male") {
      await expect(this.genderMaleRadioBtn).toBeChecked();
      await expect(this.genderFemaleRadioBtn).not.toBeChecked();
    } else if (data.gender === "Female") {
      await expect(this.genderFemaleRadioBtn).toBeChecked();
      await expect(this.genderMaleRadioBtn).not.toBeChecked();
    }
    if (data.hobbie) {
      const hobbies = Array.isArray(data.hobbie) ? data.hobbie : [data.hobbie];
      if (hobbies.includes("Reading")) await expect(this.hobbyReadingCheckbox).toBeChecked();
      if (hobbies.includes("Sports")) await expect(this.hobbySportsCheckbox).toBeChecked();
      if (hobbies.includes("Music")) await expect(this.hobbyMusicCheckbox).toBeChecked();
    }
    if (data.time) {
      await expect(this.timeDropDownElement).toHaveValue(data.time);
    }
  }

  async expectFormFieldHaveValue(field: Locator, expectedValue: string) {
    console.log("expectedValue", expectedValue);
    await expect(field).toHaveValue(expectedValue);
  }
}
