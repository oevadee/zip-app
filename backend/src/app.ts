import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Home')
})

app.get('/api/users', async (req: Request, res: Response): Promise<any> => {

})

app.listen(port, () => console.log(`Started on ${port}`));