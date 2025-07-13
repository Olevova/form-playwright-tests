import { expect, Locator, Page } from "@playwright/test";

export async function selectOptionInDropDown(dropdownLocator:Locator,option:string){

    await dropdownLocator.selectOption(option);

};

export async function checkBoxChecking(page:Page,value:string) {
    const locatorForCheck = page.getByRole("row", { name: value }).getByRole("checkbox");
    await expect(locatorForCheck,`Checkbox with value "${value}" not found`).toBeVisible();
    await locatorForCheck.check();
    await expect(locatorForCheck).toBeChecked()
}

