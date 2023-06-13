import axios from "axios";

export const getPostsRequests = async () =>
  await axios.get("http://localhost:4000/posts");

export const getPostRequest = async (_id) =>
  await axios.get(`http://localhost:4000/posts/${_id}`);

export const createPostRequest = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }

  return await axios.post("http://localhost:4000/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePostRequest = async (id) =>
  await axios.delete(`http://localhost:4000/posts/${id}`);

export const updatePostRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/posts/${id}`, newFields);
