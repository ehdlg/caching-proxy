"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cache_1 = __importDefault(require("./cache"));
const middlewares_1 = require("./middlewares");
function start(port, origin) {
    const app = (0, express_1.default)();
    app.use((req, res, next) => {
        res.locals.origin = origin;
        next();
    });
    app.get('*', middlewares_1.generateUrl, middlewares_1.checkCache, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { url } = res.locals;
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            cache_1.default.set(url, JSON.stringify(data));
            return res.set({ 'X-Cache': 'MISS' }).json(data);
        }
        catch (error) {
            console.error('There was an error fetching the resource');
            return res.json({ error: 'There was an error fetching the resource' });
        }
    }));
    app.listen(port, () => {
        try {
            console.log(`Listening on port http://localhost:${port}`);
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.default = { start };
