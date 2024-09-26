import express from 'express';
import myCache from './cache';
import { checkCache, generateUrl } from './middlewares';

function start(port: number, origin: string) {
  const app = express();

  app.use((req, res, next) => {
    res.locals.origin = origin;

    next();
  });

  app.get('*', generateUrl, checkCache, async (req, res, next) => {
    const { url } = res.locals;

    try {
      const response = await fetch(url);
      const data = await response.json();
      myCache.set(url, JSON.stringify(data));

      return res.set({ 'X-Cache': 'MISS' }).json(data);
    } catch (error) {
      console.error('There was an error fetching the resource');

      return res.json({ error: 'There was an error fetching the resource' });
    }
  });

  app.listen(port, () => {
    try {
      console.log(`Listening on port http://localhost:${port}`);
    } catch (error) {
      console.error(error);
    }
  });
}

export default { start };
