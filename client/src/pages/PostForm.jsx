import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../content/postContext";
import * as Yup from "yup";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLoading3Quarters} from "react-icons/ai";

export const PostForm = () => {
  const [post, setPost] = useState({ title: "", description: "", image: null });
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    (async () => {
      if (params.id) {
        const post_ = await getPost(params.id);
        setPost(post_);
      }
    })();
  }, [params.id]);
  return (
    <div className="flex justify-center items-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-xl">New Post</h3>
          <Link to={"/"} className="text-gray-400 tet-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("title is required"),
            description: Yup.string().required("Description is required")
          })}
          onSubmit={async (values, actions) => {
            console.log(values)
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false)
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400 pl-2"
              >
                Title
              </label>
              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 font-bold text-sm"
                name="title"
              />
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400 pl-2"
              >
                Description
              </label>
              <Field
                component={"textarea"}
                rows={3}
                name="description"
                placeholder="description"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 font-bold text-sm"
                name="description"
              />
                <label
                  htmlFor="title"
                  className="text-sm block font-bold text-gray-400 pl-2"
                >
                  Description
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setFieldValue('image',e.target.files[0])}
                  className="px-3 py-2 focus:outline-none rounded bg-gray-400 my-1 w-full"
                />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-500 px-4 py-2 mt-2 rounded-lg hover:bg-indigo-600 font-bold text-gray-300"
              >
                {isSubmitting ? <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" /> : "Save"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
