import React, { useState } from "react";
import LoginButton from "../../components/loginButton";
import styles from "./index.module.css";

function Login() {
  const [nandoku, setNandoku] = useState("Nandoku");
  const [i, setI] = useState(0);

  const nandokuReadings = [
    "「難読」",
    "「なんどく」",
    "「ナンドク」",
    "「Nandoku」",
  ];
  function changeReading() {
    if (i < nandokuReadings.length - 1) {
      setI(i + 1);
      setNandoku(nandokuReadings[i]);
    } else {
      setI(0);
      setNandoku(nandokuReadings[i]);
    }
  }
  return (
    <div
      className={styles.container}
      onClick={() => {
        changeReading();
      }}
    >
      <div className={styles.welcomeMessage}>
        <h1 className={styles.appName}>{nandoku}</h1>
        <h1 className={styles.welcome}>にようこそ</h1>
      </div>
      <LoginButton />
    </div>
  );
}

export default Login;
