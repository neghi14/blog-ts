"use client";
import { useEffect, useState } from "react";
import FeedCard from "./feedCard";

export default function Feed() {
  const [active, setActive] = useState("top");
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(
        "http://localhost:8080/api/v1/blogs/64859fdccb94f35fd0a9e04d"
      );
      const data = await res.json();
      setBlog(data.data);
    };
    fetchBlog();
  }, []);
  console.log(blog);
  console.log(active);
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
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
      
    </div>
  );
}
