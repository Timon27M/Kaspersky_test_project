import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import UserCards from "../../components/UserCards/UserCards";
import Button from "../../components/ui-kit/Button/Button";
import styles from "./MainPage.module.scss";
import Popup from "../../components/Popup/Popup";

function MainPage() {

  const [isOpenPopup, setIsOpenPopup] = useState(false)

  function handleButtonClick() {
    setIsOpenPopup(true)
  }

  return (
    <section className={styles.section}>
      <NavBar />
      <UserCards />
      <Popup isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup}/>
      <Button text={"+"} classname={styles.button} handleClick={handleButtonClick}/>
    </section>
  );
}

export default MainPage;
