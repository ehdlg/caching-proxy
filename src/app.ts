import { Command, InvalidArgumentError } from 'commander';
import NodeCache from 'node-cache';
import server from './server';
import { validateOrigin, validatePort } from './validation';

const program = new Command();

program.description('Caching proxy CLI tool').version('0.0.1');

program
  .option('-p, --port <port>', 'Port to listen to', validatePort)
  .option('-o, --origin <url>', 'URL to forward', validateOrigin);

if (!process.argv.slice(2).length) {
  program.outputHelp();

  process.exit(0);
}

program.parse(process.argv);

const { port, origin } = program.opts();

if (null == port) {
  throw new InvalidArgumentError(
    'The port option is required. Please provide a port using -p or --port.'
  );
}
if (null == origin) {
  throw new InvalidArgumentError(
    'The origin option is required. Please provide a URL using -o or --origin.'
  );
}

server.start(port, origin);
