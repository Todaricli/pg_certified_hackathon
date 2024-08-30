/* 
  Example Route File
*/
import { Router } from 'express';

const helloRoutes = Router();

// Route to handle /hello/:name
helloRoutes.get('/:name', async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send("Your name!?!? :(");
  }

  return res.status(200).send(`Kia Ora ${name}`);
});

// Route to handle /hello (without name parameter)
helloRoutes.get('/', async (req, res) => {
  return res.status(200).send("Hello, you didn't provide a name!");
});

export default helloRoutes;
