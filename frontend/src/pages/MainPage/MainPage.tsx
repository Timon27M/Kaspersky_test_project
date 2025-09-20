import NavBar from "../../components/NavBar/NavBar";
import SearchInput from "../../components/SearchInput/SearchInput";
import UserCards from "../../components/UserCards/UserCards";
import styles from "./MainPage.module.scss";

function MainPage() {
  return (
    <section className={styles.section}>
      {/* <div className={styles.navBlock}> */}
        <NavBar />
      {/* </div> */}
      <UserCards />
    </section>
  );
}

export default MainPage;
