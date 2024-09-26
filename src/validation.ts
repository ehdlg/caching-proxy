import { createServer } from 'http';
import { InvalidArgumentError } from 'commander';

export const validatePort = (value: string) => {
  const parsedPort = parseInt(value);

  if (isNaN(parsedPort)) throw new InvalidArgumentError('Port must be a number');

  if (parsedPort <= 1024) throw new InvalidArgumentError('Port must be above 1024');

  return parsedPort;
};

export const validateOrigin = (value: string) => {
  const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/;

  if (urlPattern.test(value)) return value;

  throw new InvalidArgumentError('Not a valid URL');
};
