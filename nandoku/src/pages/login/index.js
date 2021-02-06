import React from "react";
import LoginButton from "../../components/loginButton";
import styles from "./index.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>ナンドクにようこそ</h1>
      <LoginButton />
    </div>
  );
}

export default Login;
