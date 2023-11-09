import Image from "next/image";
import Feed from "@components/pages/home/feed";

export default function Home() {
  return (
    <section className="position">
      <div className="hero">
        <div className="hero__header">
          <h1 className="header--main">
            Share Compelling
            <br className="sm:hidden" />
            <span className="header--main-sub"> Developer stories</span>
          </h1>

          <p className="header--sub">
            Exploring the benefits of storytelling and effective writing
            techniques for developers!
          </p>
        </div>
      </div>
      <Feed />
    </section>
  );
}
