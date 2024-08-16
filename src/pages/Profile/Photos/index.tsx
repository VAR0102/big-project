import { useEffect, useRef, useState } from "react";
import { addPost, getAllPosts } from "../../../helpers/api";
import { IPost } from "../../../helpers/types";
import { BASE } from "../../../helpers/default";

export const Photos = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const photo = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState<string>("");
  const handlePostAdd = () => {
    const file = photo.current?.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("photo", file);
      form.append("content", text);
      addPost(form).then((response) => {
        setPosts([...posts, response.payload as IPost]);
        setText(text);
      });
    }
  };

  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response.payload as IPost[]);
    });
  }, []);

  return (
    <>
      <h1>All Posts</h1>
      <input type="file" ref={photo} />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handlePostAdd}>Upload</button>
      {posts.map((post) => (
        <div key={post.id}>
          <img src={BASE + post.picture} />
          <p>{post.title}</p>
        </div>
      ))}
    </>
  );
};
