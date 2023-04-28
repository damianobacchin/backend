import { Request, RequestHandler, Response } from 'express'
import Post from '../../models/post.model'
import User from '../../models/user.model'
import { IPost } from '../../interfaces/post.interface'
import { IAuthUser, IPopUser, IUser } from '../../interfaces/user.interface'

export const createPost: RequestHandler = async (req, res) => {
    const userId = (req.user as IAuthUser)._id
    const { title, subtitle, content } = req.body

    const newPost = new Post({
        title,
        subtitle,
        content,
        author: userId
    })

    await newPost.save()

    res.status(201).json('Nuovo post creato')
}

export const getAllPosts: RequestHandler = async (req, res) => {

    const posts = await Post.find({})
        .populate<{author: IPopUser}>({ path: 'author', select: 'email' })

    for (const post of posts) {
        console.log(post.author.email)
    }

    return res.status(200).json(posts)
}

export const getPost: RequestHandler = async (req, res) => {
    const { postId } = req.params

    const post = await Post.findById(postId)
    console.log(post?.author)

    return res.status(200).json(post)
}