import { PostModel } from "models/Post.model"


export const getPosts = async (
  search:string = '',
  limit: number = 10,
  page:number = 1
) => {
  const filters = search ? { title: { $regex: search, $options: 'i' } } : {};

  const [posts, count] = await Promise.all([
    PostModel.find(filters)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 })
      .exec(),
    PostModel.countDocuments(filters)
  ])

  if (!posts) {
    throw new Error('Posts not found');
  }

  return {
    posts,
    lastPage: Math.ceil(count / Number(limit))
  }
}
