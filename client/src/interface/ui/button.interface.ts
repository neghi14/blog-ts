export default interface Button {
  class: string;
  type: "button" | "submit";
  label: string;
  onClick?: any
}
