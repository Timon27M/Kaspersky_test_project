"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueUsers = void 0;
const faker_1 = require("@faker-js/faker");
const generateUniqueUsers = (count) => {
    const users = [];
    const logins = new Set();
    const emails = new Set();
    const groups = [
        "management",
        "accounting",
        "development",
        "analytics",
        "tester",
    ];
    while (users.length < count) {
        const name = faker_1.faker.person.firstName();
        const surname = faker_1.faker.person.lastName();
        const login = faker_1.faker.internet
            .userName({ firstName: name, lastName: surname })
            .toLowerCase();
        const email = faker_1.faker.internet
            .email({ firstName: name, lastName: surname })
            .toLowerCase();
        const group = faker_1.faker.datatype.boolean()
            ? faker_1.faker.helpers.arrayElement(groups)
            : undefined;
        if (!logins.has(login) && !emails.has(email)) {
            users.push({ name, surname, login, email, group });
            logins.add(login);
            emails.add(email);
        }
    }
    return users;
};
exports.generateUniqueUsers = generateUniqueUsers;
