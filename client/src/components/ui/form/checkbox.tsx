import Checkbox from "@interface/ui/checkbox.interface";

export default function Checkbox(props: Checkbox) {
  return (
    <input
      className="mr-2"
      type="checkbox"
      name={props.name}
      disabled={props.disabled}
      id={props.name}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
}
