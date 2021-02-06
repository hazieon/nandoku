import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./index.module.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className={styles.profileContainer}>
        <div className={styles.profileData}>
          <img
            className={styles.profilePic}
            src={user.picture}
            alt={user.name}
          />
          {/* <h2>{user.name}</h2> */}
        </div>
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
};

//make this info available as context later
export default Profile;
