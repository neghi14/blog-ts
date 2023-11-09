import Textarea from "@interface/ui/textarea.interface";

export default function TextArea(props: Textarea) {
  return (
    <>
      <textarea
        className={props.error ? "form__input border-red-500" : "form__input"}
        name={props.name}
        id={props.name}
        rows={3}
        style={{ resize: "none" }}
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props.onKeyup}
      ></textarea>
      {props.error && (
        <small className="text-xs font-medium text-red-500">
          {props.helperText}
        </small>
      )}
    </>
  );
}
