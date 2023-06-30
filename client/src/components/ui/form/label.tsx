import Label from "@interface/ui/label.interface";

export default function Label(props: Label) {
  return <label className="form__title" htmlFor={props.name}>{props.label}</label>;
}
