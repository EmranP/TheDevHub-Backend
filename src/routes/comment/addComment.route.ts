import { addComment } from "controllers/comment/addComment.controller";
import { Router, Request, Response } from "express";
import { mapComment } from "utils/mappingComment.util";

const routeCommentAdd = Router()

routeCommentAdd.post('posts/:id/comments', async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { content,  } = req.body as {content: string}

    if (!req.params.id || !content) {
      res.status(404).send({error: 'Comment not found'})

      return
    }

    const newComment = await addComment(req.params.id,
      {
        content: content,
        author: req?.user?.id as string | number
      }
    )

    if (!newComment) {
      res.status(501).send({error: 'New comment is not be created'})

      return
    }
    res.status(201).send({data: mapComment(newComment)})
  } catch (e) {
    if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})

export default routeCommentAdd
