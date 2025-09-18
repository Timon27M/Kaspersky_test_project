import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

type TError = {
    statusCode?: number;
    message: string;
}

const handlerError: ErrorRequestHandler = (err: TError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    message: err.message,
  });
  
  next();
};

export default handlerError;
