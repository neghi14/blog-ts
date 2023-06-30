"use client";
import CommentCard from "./commentCard";
import TextArea from "@components/ui/form/textarea";
import Button from "@components/ui/form/button";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { useFormik } from "formik";
import { commentValidator } from "@lib/validations/comment.validation";
import { useAddCommentMutation } from "@services/post.service";
import { useCommentsQuery } from "@services/post.service";
import { useRouter } from "next/navigation";

export default function Comment(props: any) {
  const [addComment, { isSuccess }] = useAddCommentMutation();
  const { data, isLoading } = useCommentsQuery({ id: props._id });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logged_in = true;
  // useAppSelector((state) => {
  //   return state.auth.logged_in;
  // });
  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: commentValidator,
    onSubmit: (values) => {
      const payload = {
        body: values.comment,
      };
      addComment({ id: props._id, ...payload }).then((res: any) => {
        if (res?.data.status === "success!") {
          console.log(res);
          router.refresh();
        } else if (res.error) {
          console.log(res.error.data.message);
        }
      });
    },
  });

  return (
    <>
      <hr />
      {isLoading ? (
        <div />
      ) : (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Comments <span className="text-base">{data.data.length}</span>
          </h2>
          {!logged_in ? (
            <div className="mx-auto w-max inline-block">
              {" "}
              Log in to comment!
            </div>
          ) : (
            <form
              className="flex flex-col gap-2 items-start"
              onSubmit={formik.handleSubmit}
            >
              <TextArea
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                helperText={formik.touched.comment && formik.errors.comment}
              />
              <Button
                type="submit"
                label="Post Comment"
                class="btn btn--active"
              />
            </form>
          )}
          <div className="mt-4">
            {data.data.length === 0 ? (
              <div className="mx-auto w-max inline-block">No Comments</div>
            ) : (
              <CommentCard props={data.data} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
