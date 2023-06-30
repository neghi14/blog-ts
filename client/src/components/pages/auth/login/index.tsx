"use client";
import { useFormik } from "formik";
import { loginValidator } from "@lib/validations/login.validation";
import InputGroup from "@components/group/form/input-group";
import CheckboxGroup from "@components/group/form/checkbox-group";
import Button from "@components/ui/form/button";
import { useLoginMutation } from "@services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@lib/hooks";
import { setLogin } from "@lib/features/authSlice";

export default function LoginContent() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: { username: "", password: "", remember: false },
    validationSchema: loginValidator,
    onSubmit: (values) => {
      const payload = {
        username: values.username,
        password: values.password,
      };
      login(payload).then((res: any) => {
        if (res.data.status === "success") {
          const payload = {
            user: res.data.data.user,
            session_token: res.data.data.session.session_token,
            refresh_token: res.data.data.session.session_token,
            logged_in: true,
          };
          dispatch(setLogin(payload));
          router.push(`/dashboard/@${res.data.data.user.username}`);
        }
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
          Login to access full functionalities
        </p>
      </div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <InputGroup
          type="text"
          name="username"
          label="username"
          placeholder="john doe"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <InputGroup
          type="password"
          name="password"
          label="password"
          placeholder="******"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <CheckboxGroup
          label="Remeber me?"
          name="remember"
          value={formik.values.remember}
          onChange={formik.handleChange}
          required={false}
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
