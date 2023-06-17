interface Input {
  type: string;
  label: string;
  name: string;
  value?: string;
  disabled?: boolean;
  placeholder: string;
  onChange?: any;
  onKeyup?: any;
  error?: boolean;
  helperText?: any;
}

export default function InputField(props: Input) {
  return (
    <div className="form__group">
      <label className="form__title" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="form__input"
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        disabled={props.disabled}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props.onKeyup}
      />
      {props.error && <small className="text-xs font-medium text-red-500">{props.helperText}</small>}
    </div>
  );
}
