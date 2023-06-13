import { useContext } from "react";
import { useEffect } from "react";
import { useState, createContext } from "react";
import {
  getPostsRequests,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/posts";

const postContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

// eslint-disable-next-line react/prop-types
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await getPostsRequests();
      console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (post) => {
    console.log(post);
    const res = await createPostRequest(post);
    setPosts([...posts, res.data]);
  };

  const deletePost = async (_id) => {
    const res = await deletePostRequest(_id);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post._id !== _id));
    }
  };

  const getPost = async (_id) => {
    const res = await getPostRequest(_id);
    console.log(res.data.data);
    return res.data.data;
  };

  const updatePost = async (id, post) => {
    const res = await updatePostRequest(id, post);
    setPosts(posts.map( post => post._id === id ? res.data : post))
    console.log(res)
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <postContext.Provider
      value={{
        posts,
        setPosts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
      }}
    >
      {" "}
      {children}{" "}
    </postContext.Provider>
  );
};
