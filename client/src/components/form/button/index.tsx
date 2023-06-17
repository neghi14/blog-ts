interface Button {
  class: string;
  type: "button" | "submit";
  label: string;
}

export default function Button(props: Button) {
  return (
    <button className={props.class} type={props.type}>
      {props.label}
    </button>
  );
}
