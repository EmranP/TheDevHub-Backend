import { IPostSchema } from "models/Post.model";
import mongoose from "mongoose";
import { mapComment } from "./mappingComment.util";
// import { ICommentSchema } from "models/Comment.model";

export interface IPostDTO {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  comments: ReturnType<typeof mapComment>[];
  publishedAt: Date;
}

export const mapPost = (post:IPostSchema) :IPostDTO => (
  {
    id: post.id.toString(),
    title: post.title,
    imageUrl: post.image as string,
    content: post.content,
    comments: post.comments.map(comment => mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)),
    publishedAt: post.createdAt,
  }
)
