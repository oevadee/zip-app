"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const module_alias_1 = __importDefault(require("module-alias"));
const config_1 = __importDefault(require("./config"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
module_alias_1.default.addAlias('src', __dirname);
const { CLIENT, PORT } = config_1.default;
const app = express_1.default();
//options for cors midddleware
const options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: `http://${CLIENT}`,
    preflightContinue: false,
};
//use cors middleware
app.use("/static", express_1.default.static(path_1.default.join(__dirname, process.env.NODE_ENV === "production" ? "uploads" : "../uploads"), { fallthrough: false }));
console.log(path_1.default.join(__dirname, "../uploads"));
app.use(cors_1.default(options));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/users', routes_1.usersRoute);
app.use('/api/expenses', routes_1.expensesRoute);
app.use('/api/chat', routes_1.chatRoute);
app.listen(PORT, () => console.log(`Started on ${PORT}`));
//# sourceMappingURL=app.js.map