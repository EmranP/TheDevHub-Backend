import { getPostItem } from "controllers/post/getPostItem.controller";
import { getPosts } from "controllers/post/getPosts.controller";
import { Router, Request, Response } from "express";
import { mapPost } from "utils/mappingPost.util";

const routePostGet = Router()

routePostGet.get('/posts', async (req:Request, res:Response):Promise<void> => {
  try {
    const { search = '', limit = 10, page = 1 } = req.query

    const { posts, lastPage } = await getPosts(search as string, Number(limit), Number(page))

    if (!posts) {
      res.status(404).send({error: "Posts not found"})

      return
    }

    res.status(200).send({data: {lastPage, posts: posts.map(mapPost)}})
  } catch (e) {
    if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})

routePostGet.get('/posts/:id', async (req:Request, res:Response):Promise<void> => {
  try {
    const {id} = req.params

    const post = await getPostItem(id)

    if (!id || !post) {
      res.status(404).send({error: 'Post not found'})

      return
    }

    res.status(200).send({data: mapPost(post)})
  } catch (e) {
    if (e instanceof Error) {
      console.error("❌ Server Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }

    return
  }
})

export default routePostGet
