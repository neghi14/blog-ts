"use client";
import { useFormik } from "formik";
import { registerValidator } from "@lib/validations/register.validation";
import Button from "@components/ui/form/button";
import CheckboxGroup from "@components/group/form/checkbox-group";
import InputGroup from "@components/group/form/input-group";
import { useRegisterMutation } from "@services/auth.service";
import Link from "next/link";
import { setLogin } from "@lib/features/authSlice";

import * as yup from "yup";
import { useAppDispatch } from "@lib/hooks";
import { useRouter } from "next/navigation";

export default function RegisterContent() {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      terms: "",
    },
    validationSchema: registerValidator,
    onSubmit: (values) => {
      console.log(values);
      const payload = {
        email: values.email,
        username: values.username,
        password: values.password,
      };
      register(payload)
        .then((res: any) => {
          console.log(res);
          if (res.data?.status === "success") {
            const payload = {
              user: res.data.data.user,
              session_token: res.data.data.session.session_token,
              refresh_token: res.data.data.session.session_token,
              logged_in: true,
            };
            dispatch(setLogin(payload));
            void router.push(`/verify/@${payload.user.username}`);
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
        <InputGroup
          label="email"
          name="email"
          type="email"
          placeholder="john@doe.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <InputGroup
          label="Username"
          type="text"
          name="username"
          placeholder="john.doe"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <InputGroup
          label="Password"
          type="text"
          name="password"
          placeholder="*****"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <InputGroup
          label="Confirm Password"
          type="text"
          name="confirm_password"
          placeholder="*****"
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
        <CheckboxGroup
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
