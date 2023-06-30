import * as yup from "yup";

export const commentValidator = yup.object().shape({
  comment: yup.string().required("Comment can not be empty!").trim(),
});
