"use client";
import { useFormik } from "formik";
import { verifyValidator } from "@lib/validations/verify.validation";
import Button from "@components/ui/form/button";
import InputGroup from "@components/group/form/input-group";
import { useVerifyMutation } from "@services/auth.service";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@lib/hooks";

export default function VerifyUserContent() {
  const [verify, { isLoading }] = useVerifyMutation();
  const user:any = useAppSelector((state) => {
    state.auth.user;
  });
  const router = useRouter();
  const formik = useFormik({
    validationSchema: verifyValidator,
    initialValues: { code: "" },
    onSubmit: (values) => {
      const payload = {
        token: values.code,
      };
      verify(payload).then((res: any) => {
        if (res.data.status === "success") {
          router.push(`/dashboard/@${user.username}`);
        }
      });
    },
  });
  return (
    <>
      <div className="authentication__header">
        <h2 className="authentication__header--main">Verify your email</h2>
        <p className="authentication__header--sub">
          Enter code sent to your email
        </p>
      </div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <InputGroup
          label="code"
          name="code"
          type="text"
          placeholder="j4sde9"
          onChange={formik.handleChange}
          value={formik.values.code}
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
        />
        <Button class="btn btn--auth" type="submit" label="Continue" />
      </form>
      <p className="text-center mt-4">
        Did not recieve a code?
        <Button class="btn" type="button" label="Try again" />
      </p>
    </>
  );
}
