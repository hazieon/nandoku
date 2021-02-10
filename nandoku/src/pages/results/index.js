import styles from "./index.module.css";
import { Link } from "react-router-dom";

function Results({ title, roundSet }) {
  console.log({ title });
  console.log({ roundSet });
  return (
    <>
      <Link className={styles.link} to={"/"}>
        ⇦
      </Link>
      <div className={styles.container}>
        <div className={styles.backLink}></div>
        <div>
          <h1 className={styles.flashcard}>results go here</h1>
          <ul>{title ? title : ""}</ul>
          {roundSet
            ? roundSet.map((k) => {
                return <li>{k}</li>;
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default Results;
