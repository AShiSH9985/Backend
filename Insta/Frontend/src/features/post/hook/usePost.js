import { getFeed, createPost,likePost,unLikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data.posts.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (imageFile, caption) => {
    try {
      setLoading(true);
      const data = await createPost(imageFile, caption);

      // safer update to avoid stale state bug
      setFeed((prev) => [data.post, ...prev]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (post)=>{
    const data =await likePost(post)
    await handleGetFeed()
}
const handleUnLike = async (post)=>{

    const data =await unLikePost(post)
    await handleGetFeed()
  }

useEffect(() => { 
    handleGetFeed()
}, [])

  return { loading, feed, post, handleGetFeed, handleCreatePost,handleLike,handleUnLike };
};