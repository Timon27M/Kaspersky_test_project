"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnknownUsers = exports.getTesterUsers = exports.getAnalyticsUsers = exports.getDevelopmentUsers = exports.getAccountingUsers = exports.getManagementUsers = exports.addMockUsers = exports.deleteUser = exports.addUser = exports.getAllUsers = exports.updateUser = exports.getUser = void 0;
const mongodb_1 = require("mongodb");
const BadRequestError_1 = __importDefault(require("../errors/BadRequestError"));
const NotFoundError_1 = __importDefault(require("../errors/NotFoundError"));
const IncorrectEmailError_1 = __importDefault(require("../errors/IncorrectEmailError"));
const user_1 = __importDefault(require("../models/user"));
const addMockUsers_1 = require("../utils/addMockUsers");
const mongoose_1 = __importDefault(require("mongoose"));
const getUser = (req, res, next) => {
    const { userId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        return next(new BadRequestError_1.default("Некорректный id пользователя"));
    }
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
    const { name, email, surname, login, group = "unknown" } = req.body;
    const { userId } = req.params;
    user_1.default.findByIdAndUpdate(userId, { name, email, surname, login, group }, {
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
    const body = req.body;
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
const deleteUser = (req, res, next) => {
    const { userId } = req.params;
    user_1.default.findByIdAndDelete(userId)
        .orFail(() => {
        throw new NotFoundError_1.default("Пользователь не найден");
    })
        .then((user) => {
        res.send(user);
    })
        .catch((err) => {
        return next(err);
    });
};
exports.deleteUser = deleteUser;
const addMockUsers = (req, res, next) => {
    user_1.default.find()
        .then((users) => {
        if (users.length < 300) {
            const mockUsers = (0, addMockUsers_1.generateUniqueUsers)(330);
            mockUsers.forEach((mockUser) => {
                const { name, email, login, surname, group = "unknown" } = mockUser;
                user_1.default.create({
                    name,
                    email,
                    surname,
                    login,
                    group,
                }).catch((error) => {
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
const getUsersByGroup = (group, req, res, next) => {
    user_1.default.find({ group })
        .then((users) => {
        res.status(200).send(users);
    })
        .catch((error) => {
        next(error);
    });
};
const getManagementUsers = (req, res, next) => {
    getUsersByGroup("management", req, res, next);
};
exports.getManagementUsers = getManagementUsers;
const getAccountingUsers = (req, res, next) => {
    getUsersByGroup("accounting", req, res, next);
};
exports.getAccountingUsers = getAccountingUsers;
const getDevelopmentUsers = (req, res, next) => {
    getUsersByGroup("development", req, res, next);
};
exports.getDevelopmentUsers = getDevelopmentUsers;
const getAnalyticsUsers = (req, res, next) => {
    getUsersByGroup("analytics", req, res, next);
};
exports.getAnalyticsUsers = getAnalyticsUsers;
const getTesterUsers = (req, res, next) => {
    getUsersByGroup("tester", req, res, next);
};
exports.getTesterUsers = getTesterUsers;
const getUnknownUsers = (req, res, next) => {
    getUsersByGroup("unknown", req, res, next);
};
exports.getUnknownUsers = getUnknownUsers;
