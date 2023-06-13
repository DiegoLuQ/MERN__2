import { HomesPage, NotFoundPage, PostForm } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./content/postContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-neutral-800 min-h-screen flex items-center">
      <div className="container px-10 m-auto">
        <PostProvider>
          <Routes>
            <Route path="/" element={<HomesPage />} />
            <Route path="/posts/:id" element={<PostForm />} />

            <Route path="/new" element={<PostForm />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </PostProvider>
      </div>
    </div>
  );
}

export default App;
