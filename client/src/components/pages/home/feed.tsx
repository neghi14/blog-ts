"use client";
import { useEffect, useState } from "react";
import FeedCard from "./feedCard";
import Feedloading from "@components/ui/loading-ui";
import { useBlogsQuery } from "@services/post.service";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { setBlogs } from "@lib/features/blog.slice";

export default function Feed() {
  const [active, setActive] = useState("top");
  const [endpoint, setEndpoint] = useState("-created_at")
  const {data, error, isLoading} = useBlogsQuery({params: endpoint});
  const dispatch = useAppDispatch()
  // if (data?.data) {
  //   console.log(data.data.blogs)
  //   dispatch(setBlogs({post: data.data.blogs}))
  // }
  return (
    <div className="feed">
      <div className="btn--group">
        <button
          onClick={() => {
            setActive("top");
            setEndpoint("-view_count,-comment,-like");
          }}
          className={
            active === "top"
              ? "btn btn--feed btn--feed-active"
              : "btn btn--feed"
          }
        >
          Top
        </button>
        <button
          onClick={() => {
            setActive("latest");
            setEndpoint("-created_at");
          }}
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
        {isLoading ? <Feedloading /> : <FeedCard {...data.data} />}
      </div>
    </div>
  );
}
