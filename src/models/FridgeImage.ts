import mongoose, { Document, Schema } from 'mongoose';

interface IFridgeImage extends Document {
    userId: mongoose.Types.ObjectId;
    imageData: string;
}

const fridgeImageSchema = new Schema<IFridgeImage>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageData: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IFridgeImage>('FridgeImage', fridgeImageSchema);
