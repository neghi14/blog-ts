import CheckboxInterface from "@interface/ui/checkbox.interface";
import LabelInterface from "@interface/ui/label.interface";
import Label from "@components/ui/form/label";
import Checkbox from "@components/ui/form/checkbox";

interface ICheckbox extends CheckboxInterface, LabelInterface {}

export default function CheckboxGroup(props: ICheckbox) {
  return (
    <>
      <div className="form__group">
        <Checkbox
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
        />
        <Label name={props.name} label={props.label} />
      </div>
    </>
  );
}
