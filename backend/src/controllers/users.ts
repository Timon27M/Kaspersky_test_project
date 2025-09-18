// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { MongoServerError } from "mongodb";

import BadRequestError from "../errors/BadRequestError";
import NotFoundError from "../errors/NotFoundError";
import IncorrectEmailError from "../errors/IncorrectEmailError";
// const UnauthorizatedError = require("../errors/UnauthorizatedError");

import User from "../models/user";
import { TAddUserBody, TDefaultError, TUserParams } from "../utils/types";
import { generateUniqueUsers } from "../utils/addMockUsers";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("Пользователь не найден");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Пользователь не найден"));
      }
      return next(err);
    });
};

export const updateUser = (
  req: Request<TUserParams, {}, TAddUserBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, surname, login } = req.body;
  const { userId } = req.params;

  User.findByIdAndUpdate(
    userId,
    { name, email, surname, login },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      throw new NotFoundError("Пользователь не найден");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Переданы некорректные данные"));
      }
      if (err.code === 11000) {
        return next(
          new IncorrectEmailError("Пользователь с таким email уже существует")
        );
      }
      return next(err);
    });
};

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.find()
    .then((users) => {
      res.status(201).send(users);
    })
    .catch((error: TDefaultError) => {
      next(error);
    });
};

export const addUser = (
  req: Request<{}, {}, TAddUserBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, login, surname, group } = req.body;

  User.create({
    name,
    email,
    surname,
    login,
    group,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      if (error instanceof MongoServerError && error.code === 11000) {
        return next(
          new IncorrectEmailError(
            "Пользователь с таким email или логином уже существует"
          )
        );
      }
      return next(error);
    });
};

export const addMockUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.find()
    .then((users) => {
      if (users.length < 300) {
        const mockUsers = generateUniqueUsers(330);
        mockUsers.forEach((mockUser) => {
          User.create(mockUser)
            .catch((error) => {
              if (error instanceof MongoServerError && error.code === 11000) {
                return next(
                  new IncorrectEmailError(
                    "Пользователь с таким email или логином уже существует"
                  )
                );
              }
              return next(error);
            });
        });
      }

      res.status(201).send("Пользователи успешно добавлены")
    })
    .catch((error: TDefaultError) => {
      next(error);
    });
};

// const createUser = (req, res, next) => {
//   const { name, email, password } = req.body;

//   bcrypt
//     .hash(password, 10)
//     .then((hash) =>
//       User.create({
//         name,
//         email,
//         password: hash,
//       })
//     )
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, "super-strong-secret");
//       res.status(200).send({
//         name: user.name,
//         email: user.email,
//         _id: user._id,
//         token,
//       });
//     })
//     .catch((err) => {
//       if (err.code === 11000) {
//         return next(
//           new IncorrectEmailError("Пользователь с таким email уже существует")
//         );
//       }
//       if (err.name === "ValidationError") {
//         return next(new BadRequestError("Переданы некорректные данные"));
//       }
//       return next(err);
//     });
// };

// const loginUser = (req, res, next) => {
//   const { email, password } = req.body;

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, "super-strong-secret");
//       res.send({ token });
//     })
//     .catch(() => {
//       next(new UnauthorizatedError("Неправильный логин или пароль"));
//     });
// };
