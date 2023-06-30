import * as yup from "yup";

export const resetValidator = yup.object().shape({
    email: yup.string().email("Enter a Valid email").required("Email is Required")
})