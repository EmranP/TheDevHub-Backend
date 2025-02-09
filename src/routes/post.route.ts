import { ROLE } from "constants/roles";
import { addComment } from "controllers/comment/addComment.controller";
import { removeComment } from "controllers/comment/deleteComment.controller";
import { addPost } from "controllers/post/addPost.controller";
import { deletePost } from "controllers/post/deletePost.controller";
import { updatePost } from "controllers/post/editPost.controller";
import { getPostItem } from "controllers/post/getPostItem.controller";
import { getPosts } from "controllers/post/getPosts.controller";
import { Router, Request, Response } from "express";
import { authenticated } from "middlewares/authenticated.middleware";
import { hasRole } from "middlewares/hasRole.middleware";
import { mapComment } from "utils/mappingComment.util";
import { mapPost } from "utils/mappingPost.util";

const routePost = Router({mergeParams: true})

export interface IPostAddRequstBody {
  title: string
  content: string
  imageUrl: string
}

// Get Posts
routePost.get('/', async (req:Request, res:Response):Promise<void> => {
  try {
    const { search, limit, page } = req.query

    const { posts, lastPage } = await getPosts(search as string, limit, page)

    if (!posts) {
      res.status(404).send({error: "Posts not found"})

      return
    }

    res.status(200).send({data: {lastPage, posts: posts.map(mapPost)}})
  } catch (e) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });

      return
  }
})

// GetItem Post
routePost.get('/:id', async (req:Request, res:Response):Promise<void> => {
  try {
    const {id} = req.params

    const post = await getPostItem(id)

    if (!id || !post) {
      res.status(404).send({error: 'Post not found'})

      return
    }

    res.status(200).send({data: mapPost(post)})
  } catch (e) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });

      return
  }
})

// Add Post
routePost.post(
  '/',
  authenticated,
  hasRole([ROLE.ADMIN]),
  async (req:Request, res:Response):Promise<void> => {
  try {
    const {title, content, imageUrl} = req.body as IPostAddRequstBody

    if (!title || !content || !imageUrl) {
      res.status(400).send({error: 'Missing required fields'})

      return
    }

    const newPost = await addPost({
      title: title,
      content: content,
      image: imageUrl
    })

    if (!newPost) {
      res.status(500).send({error: 'New Post not found'})

      return
    }

    res.status(201).send({data: mapPost(newPost)})
  } catch (e) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });

      return
  }
})

// Edit Post
routePost.patch('/:id', authenticated, hasRole([ROLE.ADMIN]), async (
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
        image: imageUrl
      }
    )

    if (!updatedPost ) {
      res.status(404).send({error: 'Post not found'})

      return
    }

    res.status(200).send({data: mapPost(updatedPost )})
  } catch (e) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });

      return
  }
})

// Remove Post
routePost.delete('/:id', authenticated, hasRole([ROLE.ADMIN]), async (
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
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });

      return
  }
})

// Comments =========================================

// Add Comments
routePost.post('/:id/comments', authenticated, async (
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
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });

      return
  }
})

// Remove Comments
routePost.delete('/:postId/comments/:commentId',
  authenticated,
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
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });

      return
    }
  }
)

export default routePost
