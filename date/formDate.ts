import { faker } from "@faker-js/faker";
import { FormData } from "../types/types";

const allHobbies = ["Reading", "Sports", "Music"];

export const hobbyTestCases = [
  { label: "no hobbies", count: 0 },
  { label: "one hobby", count: 1 },
  { label: "two hobbies", count: 2 },
  { label: "three hobbies", count: 3 },
];

export const invalidFields: (keyof FormData)[] = ["username", "password", "gender", "time"];

export function generateValidFormData(hobbiesCount: number): FormData {
  return {
    username: faker.person.firstName(),
    password: faker.internet.password(),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    hobbie: allHobbies.slice(0, hobbiesCount),
    time: faker.helpers.arrayElement(["Morning", "Noon", "Evening"]),
  };
}

export function generateInvalidFormData(invalidDate: (typeof invalidFields)[number], hobbiesNumber: number = 1): FormData {
  const testDate: FormData = {
    username: faker.person.firstName(),
    password: faker.internet.password(),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    hobbie: allHobbies.slice(0, hobbiesNumber),
    time: faker.helpers.arrayElement(["Morning", "Noon", "Evening"]),
  };

  delete testDate[invalidDate];
  return testDate;
}

export const minimalValidFormData: FormData = {
  username: faker.person.firstName(),
  password: faker.internet.password(),
  gender: faker.helpers.arrayElement(["Male", "Female"]),
  time: faker.helpers.arrayElement(["Morning", "Noon", "Evening"]),
};
