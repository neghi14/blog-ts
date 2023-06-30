import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

export default function FeedCard(props: any) {
  return props.blogs.map((value: any) => (
    <Link
      key={value._id}
      href={`posts/@${value.author.username}/${value.slug}`}
    >
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
              <p className="author__name">{`${value.author.first_name} ${value.author.last_name}`}</p>
              <p className="author__date">
                {dayjs(value.created_at).format("MMM  DD")}
              </p>
            </div>
          </div>
          <h2 className="body__title">{value.title}</h2>
          <div className="body__interactions">
            <div className="body__interactions--sub">
              <div className="interactions">
                <Image
                  src="/svg/heart.svg"
                  width={16}
                  height={16}
                  alt="heart svg"
                />
                <span className="text-sm">{value.like.length}</span>
              </div>
              <div className="interactions">
                <Image
                  src="/svg/speech.svg"
                  width={16}
                  height={16}
                  alt="heart svg"
                />
                <span className="text-sm">{value.comment.length}</span>
              </div>
              <div className="interactions">
                <Image
                  src="/svg/bookmark.svg"
                  width={16}
                  height={16}
                  alt="heart svg"
                />
                <span className="text-sm">{value.saved.length}</span>
              </div>
            </div>
            <div className="interactions">
              <Image
                src="/svg/view.svg"
                width={16}
                height={16}
                alt="heart svg"
              />
              <span className="text-sm">{value.view_count}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ));
}
