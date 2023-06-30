import AuthContainer from "@components/layout/authContainer";
import VerifyUserContent from "@components/pages/auth/verify";

export default function VerifyUser() {
  return (
    <>
      <AuthContainer>
        <VerifyUserContent />
      </AuthContainer>
    </>
  );
}
