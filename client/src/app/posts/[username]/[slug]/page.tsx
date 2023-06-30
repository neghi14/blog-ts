"use client";
import { useParams } from "next/navigation";
import Feedloading from "@components/ui/loading-ui";
import BlogView from "@components/pages/blog/view";
import { useSingleBlogQuery } from "@services/post.service";
export default function Article() {
  const params = useParams();
  const { data, isLoading } = useSingleBlogQuery({slug: params.slug});

  return (
    <>
      <section className="position">
        {isLoading ? <Feedloading /> : <BlogView {...data.data} />}
      </section>
    </>
  );
}
