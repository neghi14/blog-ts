import Article from "@components/pages/blog/article";
import Comment from "@components/pages/blog/comment";

export default function BlogView(props: any) {
  return (
    <div className="mt-4">
      <Article {...props} />
      <Comment {...props} />
    </div>
  );
}
