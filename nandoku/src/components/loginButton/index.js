import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./index.module.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.loginArea}>
      <button className={styles.login} onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
