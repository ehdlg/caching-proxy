"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUrl = exports.checkCache = void 0;
const cache_1 = __importDefault(require("./cache"));
const checkCache = (req, res, next) => {
    const { url } = res.locals;
    const cachedValue = cache_1.default.get(url);
    if (null == cachedValue)
        return next();
    const parsedValue = JSON.parse(cachedValue);
    return res.set({ 'X-Cache': 'HIT' }).json(parsedValue);
};
exports.checkCache = checkCache;
const generateUrl = (req, res, next) => {
    const { origin } = res.locals;
    const query = req.originalUrl;
    const URL = `${origin}${query}`;
    res.locals.url = URL;
    next();
};
exports.generateUrl = generateUrl;
