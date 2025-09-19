import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { errors } from "celebrate";
import mongoose from "mongoose";

import cors from "./middlewares/cors";
import handlerError from "./middlewares/handlerError";
import rateLimiter from "./middlewares/rateLimiter";
import { requestLogger, errorLogger } from "./middlewares/logger";
import routes from "./routes/users";

const app = express();
const { PORT = 3000, DBlink = "mongodb://127.0.0.1:27017/users" } =
  process.env;

app.use(bodyParser.json());
app.use(cors);

app.use(requestLogger);
app.use(rateLimiter);
app.use("/", routes);

app.use(errorLogger);

app.use(errors());
app.use(handlerError);

mongoose.connect(DBlink);

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
