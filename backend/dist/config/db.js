"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
const index_1 = __importDefault(require("./index"));
const { NEO4J_HOST, NEO4J_USERNAME, NEO4J_PASSWORD } = index_1.default;
const driver = neo4j_driver_1.default.driver(`bolt://${NEO4J_HOST}`, neo4j_driver_1.default.auth.basic(`${NEO4J_USERNAME}`, `${NEO4J_PASSWORD}`), {
    maxTransactionRetryTime: 30000,
});
exports.default = driver;
//# sourceMappingURL=db.js.map