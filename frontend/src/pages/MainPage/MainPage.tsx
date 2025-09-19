import NavBar from "../../components/NavBar/NavBar";
import SearchInput from "../../components/SearchInput/SearchInput";
import UserCards from "../../components/UserCards/UserCards";
import styles from "./MainPage.module.scss";

function MainPage() {
  return (
  <section className={styles.section}>
    <NavBar />
    <UserCards />
    <SearchInput />
  </section>
  );
}

export default MainPage;
