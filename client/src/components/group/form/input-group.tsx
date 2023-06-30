import InputInterface from "@interface/ui/input.interface";
import LabelInterface from "@interface/ui/label.interface";
import Label from "@components/ui/form/label";
import Input from "@components/ui/form/input";

interface Iinput extends InputInterface, LabelInterface {}

export default function InputGroup(props: Iinput) {
  return (
    <>
      <div className="form__group">
        <Label name={props.name} label={props.label} />
        <Input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          error={props.error}
          helperText={props.helperText}
        />
      </div>
    </>
  );
}
