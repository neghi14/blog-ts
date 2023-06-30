import * as yup from "yup";

export const verifyValidator = yup.object().shape({
  code: yup
    .string()
    .required("Code is required!")
    .min(6, "Invalid Verification Code")
    .max(6, "Invalid Verification code!"),
});
