import Image from "next/image";
import dayjs from "dayjs";

interface Blog {
  title: string;
  author: string;
  created_at: Date;
  comment: object[];
}

export default function FeedCard(props: object) {
  return (
    <div className="feed__item">
      <div className="item__body">
        <div className="body__author">
          <Image
            alt="user-profile"
            src="/images/test.jpg"
            width={32}
            height={32}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "100%",
              aspectRatio: "1/1",
            }}
          />
          <div className="body__author--details">
            <p className="author__name">{props.article.author}</p>
            <p className="author__date">
              {dayjs(props.article.created_at).format("MMM - DD")}
            </p>
          </div>
        </div>
        <h2 className="body__title">{props.article.title}</h2>
        <div className="body__interactions">
          <div className="body__interactions--sub">
            <div className="interactions">
              <Image
                src="/svg/heart.svg"
                width={16}
                height={16}
                alt="heart svg"
              />
              <span className="text-sm">{props.comment}</span>
            </div>
            <div className="interactions">
              <Image
                src="/svg/speech.svg"
                width={16}
                height={16}
                alt="heart svg"
              />
              <span className="text-sm">{15}</span>
            </div>
            <div className="interactions">
              <Image
                src="/svg/bookmark.svg"
                width={16}
                height={16}
                alt="heart svg"
              />
              <span className="text-sm">{5}</span>
            </div>
          </div>
          <div className="interactions">
            <Image src="/svg/view.svg" width={16} height={16} alt="heart svg" />
            <span className="text-sm">{props.article.view}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
