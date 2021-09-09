import styles from "./index.module.css";
import Title from "../heading";
import CatPanel from "../catPanel";
import { categories } from "./categories";
// import LogoutButton from "../logoutButton";
import Profile from "../profile";

function Menu() {
  // console.log({ categories });

  return (
    <div className={styles.container}>
      <div className={styles.userLogin}>
        <div className={styles.userLoginInfo}>
          <Profile />
          {/* <LogoutButton /> */}
        </div>
      </div>
      <Title text="ナンドク"></Title>
      <div className={styles.panel}>
        {categories.map((c, i) => {
          return (
            <section key={c.title}>
              <CatPanel
                className={c.myClass}
                title={c.title}
                // score={c.score}
                // link={c.link.path}
                // kanji={c.link.data}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
