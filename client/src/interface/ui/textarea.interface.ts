export default interface Textarea {
    name: string;
    value?: string;
    onChange?: any;
    onKeyup?: any;
    error?: boolean;
    helperText?: any;
  }