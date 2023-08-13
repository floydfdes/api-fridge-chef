import dotenv from 'dotenv';
import express from 'express';
import recipesRouter from './routes/recipes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/recipes', recipesRouter);

app.get('/', (req, res) => {
  res.send('Hello, This is the Fridge Chef API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
