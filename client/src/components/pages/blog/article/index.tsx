import dayjs from "dayjs";
import Image from "next/image";

export default function Article(props: any) {
  return (
    <div className="mb-8">
      <div className="mb-8 flex sm:flex-row flex-col gap-4 sm:items-center justify-between w-full">
        <div className="body__author">
          <Image
            alt="user-profile"
            src="/images/test.jpg"
            width={44}
            height={44}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "100%",
              aspectRatio: "1/1",
            }}
          />
          <div className="body__author--details">
            <p className="author__name">{`${props.author.first_name} ${props.author.last_name}`}</p>
            <p className="author__date">
              {`Posted on ${dayjs(props.created_at).format("MMM  DD, YYYY")}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="interactions">
            <Image
              className=""
              src="/svg/heart.svg"
              width={24}
              height={24}
              alt="heart svg"
              onClick={() => {}}
            />
            <span className="text-sm">{props.like.length}</span>
          </div>
          <div className="interactions">
            <Image
              src="/svg/speech.svg"
              width={24}
              height={24}
              alt="comment svg"
            />
            <span className="text-sm">{props.comment.length}</span>
          </div>
          <div className="interactions">
            <Image
              src="/svg/bookmark.svg"
              width={24}
              height={24}
              alt="save svg"
            />
            <span className="text-sm">{props.saved.length}</span>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="text-4xl font-bold mb-4">{props.title}</h1>
        <p>{props.body}</p>
      </div>
    </div>
  );
}
