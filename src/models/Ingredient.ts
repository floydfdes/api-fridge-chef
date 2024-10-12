import mongoose, { Document, Schema } from 'mongoose';

interface IIngredient extends Document {
    name: string;
}

const ingredientSchema = new Schema<IIngredient>({
    name: { type: String, required: true, unique: true }
});

export default mongoose.model<IIngredient>('Ingredient', ingredientSchema);

