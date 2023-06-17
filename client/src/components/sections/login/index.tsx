"use client";
import Button from "@components/form/button";
import Checkbox from "@components/form/checkbox/input";
import InputField from "@components/form/input";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";

export default function LoginContent() {
  const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!"),
    remember: yup.boolean(),
  });

  const formik = useFormik({
    initialValues: { username: "", password: "", remember: false },
    validationSchema: loginSchema,
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
          Login to access full functionalities
        </p>
      </div>
      <form
        className="form"
        action=""
        method="post"
        onSubmit={formik.handleSubmit}
      >
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
          type="password"
          name="password"
          placeholder="e.g *****"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Checkbox
          name="remember"
          label="Remember me?"
          value={formik.values.remember}
          onChange={formik.handleChange}
        />
        <Button class="btn btn--auth" type="submit" label="Login" />

        <p className="text-center mt-4">
          Forgot Password?
          <Link className="text-blue-500 ml-2" href="/reset">
            Reset
          </Link>
        </p>
      </form>
    </>
  );
}
