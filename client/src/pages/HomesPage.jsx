import { usePosts } from "../content/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
export const HomesPage = () => {
  const { posts } = usePosts();
  if (posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-white text-2xl">There are not posts</h1>
      </div>
    );
  }

  return (
    <div className="text-white">
      <header className=" flex justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-300">
          Posts ({posts.length})
        </h1>
        <Link
          to={"/new"}
          className="bg-red-400 p-2 rounded-lg hover:bg-red-500"
        >
          Create new post
        </Link>
      </header>
      <div className="grid grid-cols-3 gap-3">
        {posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>
    </div>
  );
};
