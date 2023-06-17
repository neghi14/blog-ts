import Button from "@components/form/button";
import InputField from "@components/form/input";
import Link from "next/link";

export default function VerifyUserContent() {
  return (
    <>
      <div className="authentication__header">
        <h2 className="authentication__header--main text-left">
          Verify your email
        </h2>
        <p className="authentication__header--sub text-left">
          Enter code sent to your email
        </p>
      </div>
      <form className="form" action="" method="post">
        <InputField
          label="Code"
          name="code"
          type="text"
          placeholder="e.g j4sde9"
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
