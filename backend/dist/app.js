"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const celebrate_1 = require("celebrate");
const mongoose_1 = __importDefault(require("mongoose"));
const handlerError_1 = __importDefault(require("./middlewares/handlerError"));
const rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter"));
const logger_1 = require("./middlewares/logger");
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
const { PORT = 3000, DBlink = "mongodb://127.0.0.1:27017/users" } = process.env;
app.use(body_parser_1.default.json());
// app.use(cors);
app.use(logger_1.requestLogger);
app.use(rateLimiter_1.default);
app.use("/", users_1.default);
app.use(logger_1.errorLogger);
app.use((0, celebrate_1.errors)());
app.use(handlerError_1.default);
mongoose_1.default.connect(DBlink);
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
