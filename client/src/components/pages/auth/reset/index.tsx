import { useFormik } from "formik";
import { resetValidator } from "@lib/validations/reset.validation";
import InputGroup from "@components/group/form/input-group";
import Button from "@components/ui/form/button";

export default function ResetContent() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: resetValidator,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  return (
    <>
      <div className="authentication__header">
        <h2 className="authentication__header--main">
          Reset your password
        </h2>
        <p className="authentication__header--sub">
          Enter your email
        </p>
      </div>
      <form
        className="form"
        action=""
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup
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
