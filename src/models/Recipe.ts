import mongoose, { Document, Schema } from 'mongoose';

interface IRecipe extends Document {
    name: string;
    cuisine: string;
    category: string;
    rating: number;
    imageUrl: string;
    difficulty: string;
    ingredients: Array<{
        ingredient: mongoose.Types.ObjectId,
        amount: string
    }>;
    instructions: string;
}

const recipeSchema = new Schema<IRecipe>({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    difficulty: { type: String, required: true },
    ingredients: [{
        ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        amount: { type: String, required: true }
    }],
    instructions: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IRecipe>('Recipe', recipeSchema);
