import * as yup from "yup";

export const registerValidator = yup.object().shape({
  email: yup.string().email("Invalid Email!").required("Email is required!"),
  username: yup.string().required("Username is required!"),
  password: yup.string().required("Password is required!"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required!")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  terms: yup.boolean().required("Must agree to the terms of use!"),
});
