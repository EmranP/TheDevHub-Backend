import { ROLE } from "constants/roles";
import { Router, Request, Response } from "express";
import { hasRole } from "middlewares/hasRole.middleware";
import { mapPost } from "utils/mappingPost.util";
import { updatePost } from "controllers/post/editPost.controller";
import { IPostAddRequstBody } from "./addPost.route";

const routePostEdit = Router()

routePostEdit.patch('/posts/:id', hasRole([ROLE.ADMIN]), async (
  req:Request,
  res:Response
):Promise<void> => {
  try {
    const {title, content, imageUrl} = req.body as IPostAddRequstBody
    const {id} = req.params

    if (!id || !title || !content || !imageUrl) {
      res.status(400).send({error: 'Missing required fields'})

      return
    }

    const updatedPost  = await updatePost(
      id,
      {
        title,
        content,
        imageUrl
      }
    )

    if (!updatedPost ) {
      res.status(404).send({error: 'Post not found'})

      return
    }

    res.status(200).send({data: mapPost(updatedPost )})
  } catch (e) {
      if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})

export default routePostEdit
