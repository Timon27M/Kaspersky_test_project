import { Request, Response, NextFunction } from "express";
import { MongoServerError } from "mongodb";

import BadRequestError from "../errors/BadRequestError";
import NotFoundError from "../errors/NotFoundError";
import IncorrectEmailError from "../errors/IncorrectEmailError";

import User from "../models/user";
import {
  TAddUserBody,
  TDefaultError,
  TGetUserParams,
  TGroup,
  TUserParams,
} from "../utils/types";
import { generateUniqueUsers } from "../utils/addMockUsers";
import mongoose from "mongoose";

export const getUser = (
  req: Request<TGetUserParams>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new BadRequestError("Некорректный id пользователя"));
  }
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
  const { name, email, surname, login, group } = req.body;
  const { userId } = req.params;

  User.findByIdAndUpdate(
    userId,
    { name, email, surname, login, group },
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
  const { name, email, login, surname, group = "unknown" } = req.body;

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
          const { name, email, login, surname, group = "unknown" } = mockUser;
          User.create({
            name,
            email,
            surname,
            login,
            group,
          }).catch((error) => {
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

      res.status(201).send("Пользователи успешно добавлены");
    })
    .catch((error: TDefaultError) => {
      next(error);
    });
};

const getUsersByGroup = (
  group: TGroup | "unknown",
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.find({ group })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error: TDefaultError) => {
      next(error);
    });
};

export const getManagementUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getUsersByGroup("management", req, res, next);
};

export const getAccountingUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getUsersByGroup("accounting", req, res, next);
};

export const getDevelopmentUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getUsersByGroup("development", req, res, next);
};

export const getAnalyticsUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getUsersByGroup("analytics", req, res, next);
};

export const getTesterUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getUsersByGroup("tester", req, res, next);
};

export const getUnknownUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getUsersByGroup("unknown", req, res, next);
};
