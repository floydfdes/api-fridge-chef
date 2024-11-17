import mongoose, { Document, Schema } from 'mongoose';

interface IRecipe extends Document {
    name: string;
    cuisine: string;
    category: string;
    rating: number;
    imageUrl: string;
    difficulty: string;
    ingredients: Array<{
        name: string,
        amount: string
    }>;
    instructions: string;
    createdBy: mongoose.Types.ObjectId;
}

const recipeSchema = new Schema<IRecipe>({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    difficulty: { type: String, required: true },
    ingredients: [{
        name: { type: String, required: true },
        amount: { type: String, required: true }
    }],
    instructions: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IRecipe>('Recipe', recipeSchema);
