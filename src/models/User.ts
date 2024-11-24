import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    bio?: string;
    recipesCount: number;
    followersCount: number;
    followingCount: number;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: String,
    bio: String,
    recipesCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);

