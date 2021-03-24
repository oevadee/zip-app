import express, { Request, Response } from 'express';
import cors from 'cors';

import { usersRoute, expensesRoute } from './routes';

const app = express();
const port = 8080;

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:3000",
  preflightContinue: false,
};

//use cors middleware
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRoute);
app.use('/api/expenses', expensesRoute);

app.get('/', (req, res) => {
  res.send('Home')
})

app.listen(port, () => console.log(`Started on ${port}`));