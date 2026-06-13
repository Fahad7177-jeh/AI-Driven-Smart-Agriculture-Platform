import { useParams } from "react-router-dom";

function ResetPassword() {

  const { token } = useParams();

  return (
    <>
      <h1>Reset Password Page</h1>
      <p>Token: {token}</p>
    </>
  );
}

export default ResetPassword;