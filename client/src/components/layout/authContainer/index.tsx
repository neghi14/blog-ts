interface AuthContainer {
  children: React.ReactNode;
}

export default function AuthContainer(props: AuthContainer) {
  return <div className="authentication">{props.children}</div>;
}
