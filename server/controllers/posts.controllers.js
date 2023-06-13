import Post from "../modules/Post.js";
import {uploadImage, deleteImage} from "../libs/cloudinary.js"
import fs from "fs-extra" ;
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};
export const createPost = async (req, res) => {
  try {
    console.log(req.body)
    const { title, description } = req.body;
    console.log(req.files)
    let image = null
    if(req.files?.image){
      const resultado = await uploadImage(req.files.image.tempFilePath)
      await fs.remove(req.files.image.tempFilePath)
      image = {
        url: resultado.secure_url,
        public_id: resultado.public_id
      }
    }
    const newPost = new Post({ title, description, image });
    await newPost.save();

    return res.json(newPost);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(postUpdated);
    return res.json(postUpdated);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    if (!postRemoved) return res.sendStatus(404);

    if(postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id)
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const getPost = async (req, res) => {
  try {
    // const postGet = await Post.findOne({'description':req.params.id})
    const postGet = await Post.findById(req.params.id);
    if (!postGet) {
      return res.status(404).json({
        msg: "No se encontro",
        data: {},
      });
    }
    return res.status(200).json({
      msg: "Encontrado",
      data: postGet,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
