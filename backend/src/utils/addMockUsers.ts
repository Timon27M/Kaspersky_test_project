import { faker } from "@faker-js/faker";

type UserMock = {
  name: string;
  surname: string;
  login: string;
  email: string;
  group?: "management" | "accounting" | "development" | "analytics" | "tester";
};

export const generateUniqueUsers = (count: number): UserMock[] => {
  const users: UserMock[] = [];
  const logins = new Set<string>();
  const emails = new Set<string>();
  const groups: NonNullable<UserMock["group"]>[] = [
    "management",
    "accounting",
    "development",
    "analytics",
    "tester",
  ];

  while (users.length < count) {
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const login = faker.internet
      .userName({ firstName: name, lastName: surname })
      .toLowerCase();
    const email = faker.internet
      .email({ firstName: name, lastName: surname })
      .toLowerCase();
    const group = faker.datatype.boolean()
      ? faker.helpers.arrayElement(groups)
      : undefined;

    if (!logins.has(login) && !emails.has(email)) {
      users.push({ name, surname, login, email, group });
      logins.add(login);
      emails.add(email);
    }
  }

  return users;
};
