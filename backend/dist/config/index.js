"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";
exports.default = {
    NEO4J_HOST: process.env.NEO4J_HOST || "localhost",
    NEO4J_USERNAME: process.env.NEO4J_USERNAME || "neo4j",
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD || "s3cr3t",
    PORT: process.env.PORT || "8080",
    CLIENT: process.env.CLIENT || "localhost:3000"
};
//# sourceMappingURL=index.js.map