import { userGroup } from "../../assets/mocksData";
import NavButton from "../ui-kit/NavButton/NavButton";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <div className={styles.container}>
      {userGroup.map((item) => {
        return (
          <div className={styles.navBlock}>
            <NavButton text={item} name={item} />
          </div>
        );
      })}
    </div>
  );
}

export default NavBar;
