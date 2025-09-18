"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMockUsers = exports.addUser = exports.getAllUsers = exports.updateUser = exports.getUser = void 0;
const mongodb_1 = require("mongodb");
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const IncorrectEmailError_1 = __importDefault(require("../errors/IncorrectEmailError"));
// const UnauthorizatedError = require("../errors/UnauthorizatedError");
const user_1 = __importDefault(require("../models/user"));
const addMockUsers_1 = require("../utils/addMockUsers");
const getUser = (req, res, next) => {
    const { userId } = req.params;
    user_1.default.findById(userId)
        .orFail(() => {
        throw new NotFoundError_1.default("Пользователь не найден");
    })
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        if (err.name === "DocumentNotFoundError") {
            return next(new NotFoundError_1.default("Пользователь не найден"));
        }
        return next(err);
    });
};
exports.getUser = getUser;
const updateUser = (req, res, next) => {
    const { name, email, surname, login } = req.body;
    const { userId } = req.params;
    user_1.default.findByIdAndUpdate(userId, { name, email, surname, login }, {
        new: true,
        runValidators: true,
    })
        .orFail(() => {
        throw new NotFoundError_1.default("Пользователь не найден");
    })
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        if (err.name === "ValidationError") {
            return next(new BadRequestError_1.default("Переданы некорректные данные"));
        }
        if (err.code === 11000) {
            return next(new IncorrectEmailError_1.default("Пользователь с таким email уже существует"));
        }
        return next(err);
    });
};
exports.updateUser = updateUser;
const getAllUsers = (req, res, next) => {
    user_1.default.find()
        .then((users) => {
        res.status(201).send(users);
    })
        .catch((error) => {
        next(error);
    });
};
exports.getAllUsers = getAllUsers;
const addUser = (req, res, next) => {
    const { name, email, login, surname, group } = req.body;
    user_1.default.create({
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
        if (error instanceof mongodb_1.MongoServerError && error.code === 11000) {
            return next(new IncorrectEmailError_1.default("Пользователь с таким email или логином уже существует"));
        }
        return next(error);
    });
};
exports.addUser = addUser;
const addMockUsers = (req, res, next) => {
    user_1.default.find()
        .then((users) => {
        if (users.length < 300) {
            const mockUsers = (0, addMockUsers_1.generateUniqueUsers)(330);
            mockUsers.forEach((mockUser) => {
                user_1.default.create(mockUser)
                    .catch((error) => {
                    if (error instanceof mongodb_1.MongoServerError && error.code === 11000) {
                        return next(new IncorrectEmailError_1.default("Пользователь с таким email или логином уже существует"));
                    }
                    return next(error);
                });
            });
        }
        res.status(201).send("Пользователи успешно добавлены");
    })
        .catch((error) => {
        next(error);
    });
};
exports.addMockUsers = addMockUsers;
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
