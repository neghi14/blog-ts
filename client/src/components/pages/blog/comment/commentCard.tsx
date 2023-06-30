import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";


export default function CommentCard(props: any) {
  const [height, setHeight] = useState(10);
  return (
    <div>
      <div
        className={`flex flex-col gap-4 max-h-[${height}px] overflow-hidden`}
      >
        {props.props.map((comment: any) => (
          <div key={comment._id} className="py-4 px-2 flex flex-col gap-2 border-b">
            <div className="flex items-center gap-2">
              <Image
                src="/images/test.jpg"
                width={24}
                height={24}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "100%",
                  aspectRatio: "1/1",
                }}
                alt="Profile photo"
              />
              <span>
                {comment.author.username}{" "}
                <small>{dayjs(comment.created_at).format("MMM YY")}</small>
              </span>
            </div>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
      <p
        className="text-center mt-2 text-blue-500 cursor-pointer"
        onClick={() => {
          setHeight(() => height + 100);
        }}
      >
        View more
      </p>
    </div>
  );
}
