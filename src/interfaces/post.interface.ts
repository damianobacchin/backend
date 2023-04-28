import { ObjectId } from 'mongoose'
import { IUser } from './user.interface'

export interface IPost {
    _id: ObjectId
    title: string
    subtitle?: string
    content: string
    author: ObjectId
    createdAt: Date
    updatedAt: Date
}