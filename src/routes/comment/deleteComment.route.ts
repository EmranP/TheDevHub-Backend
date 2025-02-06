import { ROLE } from "constants/roles";
import { removeComment } from "controllers/comment/deleteComment.controller";
import { Router, Request, Response } from "express";
import { hasRole } from "middlewares/hasRole.middleware";

const routeCommentRemove = Router()

routeCommentRemove.delete('posts/:postId/comments/:commentId',
  hasRole([ROLE.ADMIN, ROLE.MODERATOR]),
  async (req:Request, res:Response): Promise<void> => {
    try {
      const {postId, commentId} = req.params

      if (!postId || !commentId) {
        res.status(404).send({error: 'Comments is not found'})

        return
      }

      await removeComment(postId, commentId)

      res.status(201).send({error: null})
    } catch (e) {
      if (e instanceof Error) {
        console.error("❌ Server Error:", e);
        res.status(500).json({ error: "Internal Server Error" });
      }

      return
    }
  }
)

export default routeCommentRemove
