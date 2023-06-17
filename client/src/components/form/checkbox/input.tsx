interface Checkbox {
  label: string;
  name: string;
  value?: any;
  disabled?: boolean;
  onChange?: any;
  required?: boolean;
}

export default function Checkbox(props: Checkbox) {
  return (
    <div className="form__group my-4">
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
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
}
