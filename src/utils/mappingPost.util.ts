import { IPostSchema } from "models/Post.model";

export interface IPostDTO {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  publishedAt: Date;
}

export const mapPost = (post:IPostSchema):IPostDTO => (
  {
    id: post.id.toString(),
    title: post.title,
    imageUrl: post.imageUrl,
    content: post.content,
    publishedAt: post.createdAt,
  }
)
