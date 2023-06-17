"use client";
import { useEffect, useState } from "react";
import FeedCard from "./feedCard";

export default function Feed() {
  const [active, setActive] = useState("top");
  const [blog, setBlog] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/blogs/64859fdccb94f35fd0a9e04d")
      .then((res) => res.json())
      .then((data) => setBlog(data.data));
  }, []);

  console.log(blog);
  const article = {
    title: blog.article.title,
    author: `${blog.article.author.first_name} ${blog.article.author.last_name}`,
    view: blog.article.view_count,
    comment: blog.comments,
    created_at: blog.article.created_at,
  };
  return (
    <div className="feed">
      <div className="btn--group">
        <button
          onClick={() => setActive("top")}
          className={
            active === "top"
              ? "btn btn--feed btn--feed-active"
              : "btn btn--feed"
          }
        >
          Top
        </button>
        <button
          onClick={() => setActive("latest")}
          className={
            active === "latest"
              ? "btn btn--feed btn--feed-active"
              : "btn btn--feed"
          }
        >
          Latest
        </button>
      </div>
      <div className="feed__block">
        <FeedCard article={article} />
      </div>
    </div>
  );
}
