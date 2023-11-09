import Input from "@interface/ui/input.interface";

export default function InputField(props: Input) {
  return (
    <>
      <input
        className={props.error ? "form__input border-red-500" : "form__input"}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        disabled={props.disabled}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props.onKeyup}
      />
      {props.error && (
        <small className="text-xs font-medium text-red-500">
          {props.helperText}
        </small>
      )}
    </>
  );
}
