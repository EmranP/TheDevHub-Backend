import { ROLE } from "constants/roles";
import { deletePost } from "controllers/post/deletePost.controller";
import { Router, Request, Response } from "express";
import { hasRole } from "middlewares/hasRole.middleware";

const routePostRemove = Router()

routePostRemove.delete('/posts/:id', hasRole([ROLE.ADMIN]), async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {id} = req.params

    if (!id) {
      res.status(400).send({error: 'Missing post ID'})

      return
    }

    const deletedPost = await deletePost(id)

    if (!deletedPost) {
      res.status(404).send({ error: 'Post not found' })

      return
    }

    res.status(200).send({error: null})
  } catch (e) {
    if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})

export default routePostRemove
