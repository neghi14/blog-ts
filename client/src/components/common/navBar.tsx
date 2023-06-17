import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="position">
      <nav className="nav">
        <Link className="nav__link link__home" href="/">
          Blogr
        </Link>
        <div className="nav--sub">
          <Link className="nav__link nav__link--hover" href="/login">
            Login
          </Link>
          <Link className="nav__link" href="/register">
            <button className="btn btn--active btn--hover btn--pressed">Signup</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
