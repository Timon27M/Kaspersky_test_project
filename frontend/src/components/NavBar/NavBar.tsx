import { userGroup } from "../../assets/mocksData";
import NavButton from "../ui-kit/NavButton/NavButton";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonList}>
        {userGroup.map((item, index) => {
          return (
            <div className={styles.navBlock} key={index}>
              <NavButton text={item} name={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NavBar;
