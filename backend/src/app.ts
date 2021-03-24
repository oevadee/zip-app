import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Home')
})

app.listen(port, () => console.log(`Started on ${port}`));