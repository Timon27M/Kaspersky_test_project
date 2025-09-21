"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationAddUser = exports.validationUpdateUser = void 0;
const celebrate_1 = require("celebrate");
exports.validationUpdateUser = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().min(2).max(30),
        surname: celebrate_1.Joi.string().min(2).max(30),
        email: celebrate_1.Joi.string().email(),
        login: celebrate_1.Joi.string().min(2).max(30),
        group: celebrate_1.Joi.string().valid("management", "accounting", "development", "analytics", "tester", "unknown"),
    }),
});
exports.validationAddUser = (0, celebrate_1.celebrate)({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required().min(2).max(30),
        surname: celebrate_1.Joi.string().required().min(2).max(30),
        email: celebrate_1.Joi.string().required().email(),
        login: celebrate_1.Joi.string().required().min(2).max(30),
        group: celebrate_1.Joi.string().valid("management", "accounting", "development", "analytics", "tester", "unknown"),
    }),
});
