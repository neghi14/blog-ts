import Button from "@interface/ui/button.interface";
export default function Button(props: Button) {
  return (
    <button className={props.class} type={props.type} onClick={props.onClick}>
      {props.label}
    </button>
  );
}
