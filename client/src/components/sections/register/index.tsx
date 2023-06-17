"use client";
import Button from "@components/form/button";
import Checkbox from "@components/form/checkbox/input";
import InputField from "@components/form/input";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";

export default function RegisterContent() {
  const registerSchema = yup.object().shape({
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!"),
    confirm_password: yup
      .string()
      .required("Confirm Password is required!")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    terms: yup.boolean().required("Must agree to the terms of use!"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      terms: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  return (
    <>
      <div className="authentication__header">
        <h2 className="authentication__header--main">
          Welcome to the Blogr community
        </h2>
        <p className="authentication__header--sub">
          Create an Account to access full functionalities
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
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <InputField
          label="Username"
          type="text"
          name="username"
          placeholder="e.g john.doe"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <InputField
          label="Password"
          type="text"
          name="password"
          placeholder="e.g *****"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <InputField
          label="Confirm Password"
          type="text"
          name="confirm_password"
          placeholder="e.g *****"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
        />
        <Checkbox
          name="terms"
          label="I agree to the Terms of Use"
          value={formik.values.terms}
          onChange={formik.handleChange}
          required={true}
        />
        <Button class="btn btn--auth" type="submit" label="Continue" />

        <p className="text-center mt-4">
          Have an Account?{" "}
          <Link className="text-blue-500" href="/login">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
