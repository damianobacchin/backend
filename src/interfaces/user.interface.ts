import { ObjectId } from 'mongoose'
import { Request } from 'express'
import { UserRole } from '../config/enums/User.enum'

export interface IUser {
    _id: ObjectId
    email: string
    password: string
    name: string
    surname: string
    role: UserRole
    createdAt: Date
    updatedAt: Date
}

export interface IAuthUser {
    _id: string
    email: string
    role: UserRole
}

export interface IPopUser {
    _id: ObjectId,
    email: string
}