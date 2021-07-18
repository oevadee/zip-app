import express from 'express';
import cors from 'cors';
import moduleAlias from 'module-alias';
import config from './config';
import path from 'path';
import chalk from 'chalk';

import { usersRoute, expensesRoute, chatRoute } from './routes';

moduleAlias.addAlias('src', __dirname);
const { CLIENT, PORT } = config;
const app = express();

//options for cors midddleware
const options: cors.CorsOptions = {
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
app.use(
  '/static',
  express.static(path.join(__dirname, '../../uploads'), { fallthrough: false })
);
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRoute);
app.use('/api/expenses', expensesRoute);
app.use('/api/chat', chatRoute);

app.listen(PORT, () => {
  console.clear();
  console.log(chalk.bold.cyanBright(`Server started on port ${PORT} \n`));
  console.log(chalk.yellow(`If you see any bugs create an Issue via:`));
  console.log(
    chalk.dim.cyanBright(`https://github.com/oevadee/zip-app/issues`)
  );
});
