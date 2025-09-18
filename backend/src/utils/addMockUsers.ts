import { faker } from "@faker-js/faker";

type UserMock = {
  name: string;
  surname: string;
  login: string;
  email: string;
  group: "management" | "accounting" | "human resources department";
};

export const generateUniqueUsers = (count: number): UserMock[] => {
  const users: UserMock[] = [];
  const logins = new Set<string>();
  const emails = new Set<string>();
  const groups: UserMock["group"][] = ["management", "accounting", "human resources department"];

  while (users.length < count) {
    const name = faker.person.firstName(); 
    const surname = faker.person.lastName(); 
    const login = faker.internet.userName({ firstName: name, lastName: surname }).toLowerCase();
    const email = faker.internet.email({ firstName: name, lastName: surname }).toLowerCase();
    const group = faker.helpers.arrayElement(groups);

    if (!logins.has(login) && !emails.has(email)) {
      users.push({ name, surname, login, email, group });
      logins.add(login);
      emails.add(email);
    }
  }

  return users;
};
