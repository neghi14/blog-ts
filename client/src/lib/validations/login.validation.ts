import * as yup from "yup";

export const loginValidator = yup.object().shape({
  username: yup.string().required("Email is Required!"),
  password: yup
    .string()
    .trim()
    .required("Password is Required!")
    .min(6, "Minimun of 6 characters is needed!"),
  remember: yup.boolean(),
});
