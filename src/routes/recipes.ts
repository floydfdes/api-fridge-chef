// src/routes/recipes.ts
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  
  const recipes:any = [] 
  res.json(recipes);
});

export default router;
