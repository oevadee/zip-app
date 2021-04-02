import express, { Request, Response } from "express";
import cors from "cors";
import moduleAlias from "module-alias";
import config from "./config";
import path from "path";

import { usersRoute, expensesRoute } from "./routes";

moduleAlias.addAlias("src", __dirname);
const app = express();

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:3000",
  preflightContinue: false,
};

//use cors middleware
app.use(express.static(path.join(__dirname, "build")));
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRoute);
app.use("/api/expenses", expensesRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(config.port, () => console.log(`Started on ${config.port}`));
