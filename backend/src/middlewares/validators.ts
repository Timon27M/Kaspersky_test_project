import { celebrate, Joi } from "celebrate";

export const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    surname: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    login: Joi.string().min(2).max(30),
    group: Joi.string().valid(
      "management",
      "accounting",
      "development",
      "analytics",
      "tester",
      "unknown"
    ),
  }),
});

export const validationAddUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    surname: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    login: Joi.string().required().min(2).max(30),
    group: Joi.string().valid(
      "management",
      "accounting",
      "development",
      "analytics",
      "tester",
      "unknown"
    ),
  }),
});
