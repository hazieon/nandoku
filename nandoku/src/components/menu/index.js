import styles from "./index.module.css";
import Title from "../heading";
import CatPanel from "../catPanel";
import { categories } from "./categories";
function Menu() {
  console.log({ categories });

  return (
    <div className={styles.container}>
      <Title text="ナンドク"></Title>
      <div className={styles.panel}>
        {categories.map((c, i) => {
          return (
            <section key={c.title}>
              <CatPanel
                className={c.myClass}
                title={c.title}
                score={c.score}
                link={c.link}
                kanji={c.kanji}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
