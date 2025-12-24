"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
exports.authConfig = {
    jwtSecret: process.env.JWT_SECRET || 'super-secret',
    apiKeyHeader: 'x-api-key',
};
