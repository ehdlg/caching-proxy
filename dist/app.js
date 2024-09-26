"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const server_1 = __importDefault(require("./server"));
const validation_1 = require("./validation");
const program = new commander_1.Command();
program.description('Caching proxy CLI tool').version('0.0.1');
program
    .option('-p, --port <port>', 'Port to listen to', validation_1.validatePort)
    .option('-o, --origin <url>', 'URL to forward', validation_1.validateOrigin);
if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
}
program.parse(process.argv);
const { port, origin } = program.opts();
if (null == port) {
    throw new commander_1.InvalidArgumentError('The port option is required. Please provide a port using -p or --port.');
}
if (null == origin) {
    throw new commander_1.InvalidArgumentError('The origin option is required. Please provide a URL using -o or --origin.');
}
server_1.default.start(port, origin);
