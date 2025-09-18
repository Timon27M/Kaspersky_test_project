import limiter from 'express-rate-limit';

const rateLimiter = limiter({
  max: 130,
  windowMs: 1 * 60 * 1000,
  message: 'В настоящий момент превышено количество запросов на сервер. Пожалуйста, попробуйте повторить позже',
});

export default rateLimiter;