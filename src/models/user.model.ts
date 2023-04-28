import mongoose, { Schema, Model, Types } from 'mongoose'
import { IUser } from '../interfaces/user.interface'
import { UserRole } from '../config/enums/User.enum'

const userSchema = new Schema<IUser, Model<IUser>>({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: UserRole,
        default: UserRole.USER
    }
}, { timestamps: true })

const User = mongoose.model<IUser & Document>('User', userSchema)
export default User