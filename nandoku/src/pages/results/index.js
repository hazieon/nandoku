import styles from "./index.module.css";

function Results({ title, roundSet }) {
  console.log({ title });
  console.log({ roundSet });
  return (
    <div className={styles.container}>
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
  );
}

export default Results;
