"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrigin = exports.validatePort = void 0;
const commander_1 = require("commander");
const validatePort = (value) => {
    const parsedPort = parseInt(value);
    if (isNaN(parsedPort))
        throw new commander_1.InvalidArgumentError('Port must be a number');
    if (parsedPort <= 1024)
        throw new commander_1.InvalidArgumentError('Port must be above 1024');
    return parsedPort;
};
exports.validatePort = validatePort;
const validateOrigin = (value) => {
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/;
    if (urlPattern.test(value))
        return value;
    throw new commander_1.InvalidArgumentError('Not a valid URL');
};
exports.validateOrigin = validateOrigin;
