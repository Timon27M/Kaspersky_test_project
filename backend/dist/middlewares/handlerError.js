"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlerError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
        message: err.message,
    });
    next();
};
exports.default = handlerError;
