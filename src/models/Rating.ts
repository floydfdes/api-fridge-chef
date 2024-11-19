import mongoose, { Document, Schema } from 'mongoose';

interface IRating extends Document {
    recipe: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    rating: number;
}

const ratingSchema = new Schema<IRating>({
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

ratingSchema.index({ recipe: 1, user: 1 }, { unique: true });

export default mongoose.model<IRating>('Rating', ratingSchema);
