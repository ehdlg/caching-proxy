import myCache from './cache';
import { type RequestHandler } from 'express';

export const checkCache: RequestHandler = (req, res, next) => {
  const { url } = res.locals;

  const cachedValue = myCache.get<string>(url);

  if (null == cachedValue) return next();

  const parsedValue = JSON.parse(cachedValue);

  return res.set({ 'X-Cache': 'HIT' }).json(parsedValue);
};

export const generateUrl: RequestHandler = (req, res, next) => {
  const { origin } = res.locals;
  const query = req.originalUrl;
  const URL = `${origin}${query}`;

  res.locals.url = URL;

  next();
};
