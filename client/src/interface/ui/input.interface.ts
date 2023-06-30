export default interface Input {
    type: string;
    name: string;
    value?: string;
    disabled?: boolean;
    placeholder: string;
    onChange?: any;
    onKeyup?: any;
    error?: boolean;
    helperText?: any;
  }