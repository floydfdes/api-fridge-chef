import mongoose, { Document, Schema } from 'mongoose';

interface INutritionalValue {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface IIngredient extends Document {
    name: string;
    nutritionalValue?: INutritionalValue;
}

const nutritionalValueSchema = new Schema<INutritionalValue>({
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
}, { _id: false });

const ingredientSchema = new Schema<IIngredient>({
    name: { type: String, required: true, unique: true },
    nutritionalValue: nutritionalValueSchema
});

export default mongoose.model<IIngredient>('Ingredient', ingredientSchema);
