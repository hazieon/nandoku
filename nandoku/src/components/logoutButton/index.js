import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./index.module.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className={styles.logoutArea}>
      <button
        className={styles.logout}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
