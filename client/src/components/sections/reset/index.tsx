import Button from "@components/form/button";
import InputField from "@components/form/input";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ResetContent() {
  const resetSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required!"),
  });
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: resetSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  return (
    <>
      <div className="authentication__header">
        <h2 className="authentication__header--main text-left">
          Reset your password
        </h2>
        <p className="authentication__header--sub text-left">
          Enter your email
        </p>
      </div>
      <form
        className="form"
        action=""
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <InputField
          label="email"
          name="email"
          type="email"
          placeholder="e.g john@doe.com"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button class="btn btn--auth" type="submit" label="Continue" />
      </form>
    </>
  );
}
