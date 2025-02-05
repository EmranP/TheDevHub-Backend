import { ROLE } from "constants/roles";
import { addPost } from "controllers/post/addPost.controller";
import { Router, Request, Response } from "express";
import { hasRole } from "middlewares/hasRole.middleware";
import { mapPost } from "utils/mappingPost.util";

const routePostAdd = Router()

export interface IPostAddRequstBody {
  title: string
  content: string
  imageUrl: string
}

routePostAdd.post('/posts', hasRole([ROLE.ADMIN]), async (req:Request, res:Response):Promise<void> => {
  try {
    const {title, content, imageUrl} = req.body as IPostAddRequstBody

    if (!title || !content || !imageUrl) {
      res.status(400).send({error: 'Missing required fields'})

      return
    }

    const newPost = await addPost({
      title,
      content,
      image: imageUrl
    })

    if (!newPost) {
      res.status(500).send({error: 'New Post not found'})

      return
    }

    res.status(201).send({data: mapPost(newPost)})
  } catch (e) {
    if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})

export default routePostAdd
