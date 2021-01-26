import React from "react";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.css";

const Title = ({ text, user, logo }) => {
  return (
    <Heading className={styles.heading}>
      {text}
      <span className={styles.logo}>{logo}</span> {user}
    </Heading>
  );
};

export default Title;
