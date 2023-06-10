interface PageProps {
  params: {
    slug: string;
  };
}

export default function Article(props: PageProps) {
  return <div>{props.params.slug}</div>;
}
