import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../content/postContext";

const PostCard = ({ post }) => {
  const { deletePost } = usePosts();
  const navigate = useNavigate();
  const handleDelete = (_id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">Do you want to delete? {_id}</p>
          <div>
            <button
              className="bg-red-400 hover:bg-red-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => {
                deletePost(_id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };
  return (
    <div
      className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3 className="text-xl text-white text-semibold">{post.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
            className="bg-red-500 text-white px-2 rounded-xl text-xs font-bold shadow-md shadow-black hover:bg-red-600 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
        <p className="text-green-600 text-bold">{post.description}</p>
      </div>
      {post.image && (
        <img
          src={post.image.url}
          alt=""
        />
      )}
    </div>
  );
};

export default PostCard;
