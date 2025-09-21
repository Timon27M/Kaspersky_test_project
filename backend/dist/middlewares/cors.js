"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedCors = [
    'http://localhost:5173',
];
const cors = (req, res, next) => {
    const { origin } = req.headers;
    const { method } = req;
    const requestHeaders = req.headers['access-control-request-headers'];
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    if (origin && allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        res.header('Access-Control-Allow-Headers', requestHeaders);
        return res.end();
    }
    return next();
};
exports.default = cors;
