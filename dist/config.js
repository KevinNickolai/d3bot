"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botToken = exports.prefix = void 0;
require('dotenv').config();
exports.prefix = ">";
exports.botToken = process.env.BOT_TOKEN;
