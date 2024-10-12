import { specs, swaggerUi } from './swagger';

import authRouter from './routes/auth';
import connectDB from './config/database';
import dotenv from 'dotenv';
import express from 'express';
import ingredientsRouter from './routes/ingredients';
import recipesRouter from './routes/recipes';
import uploadRouter from './routes/upload';
import usersRouter from './routes/users';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/upload', uploadRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('Welcome to the Fridge Chef API');
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
