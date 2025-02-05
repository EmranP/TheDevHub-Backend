import { PostModel } from "models/Post.model";

export const deletePost = (id: string) => PostModel.findByIdAndDelete(id);
