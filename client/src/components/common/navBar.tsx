import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@lib/hooks";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const logged_in = useAppSelector((state) => {
    return state.auth.logged_in;
  });
  const username = useAppSelector((state) => {
    return state.auth.user.username;
  });
  return (
    <header className="position">
      <nav className="nav">
        <Link className="nav__link link__home" href="/">
          Blogr
        </Link>
        {!logged_in ? (
          <div className="nav--sub">
            <Link className="nav__link nav__link--hover" href="/login">
              Login
            </Link>
            <Link className="nav__link" href="/register">
              <button className="btn btn--active btn--hover btn--pressed">
                Signup
              </button>
            </Link>
          </div>
        ) : (
          <Link
            className="nav__link nav__link--hover"
            href={`/dashboard/@${username}`}
          >
            <Image
              src="/images/test.jpg"
              width={32}
              height={32}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "100%",
                aspectRatio: "1/1",
              }}
              alt="Profile photo"
            />
          </Link>
        )}
      </nav>
    </header>
  );
}
