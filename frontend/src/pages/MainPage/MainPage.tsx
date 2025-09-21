import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import UserCards from "../../components/UserCards/UserCards";
import Button from "../../components/ui-kit/Button/Button";
import styles from "./MainPage.module.scss";
import Popup from "../../components/Popup/Popup";

function MainPage() {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isActiveMobileNavBar, setIsActiveMobileNavBar] = useState(false);

  function handleButtonNavBarClick() {
    setIsActiveMobileNavBar(!isActiveMobileNavBar)
  }
   
  function handleButtonAddUserClick() {
    setIsOpenPopup(true)
  }

  return (
    <section className={styles.section}>
      <NavBar isActiveMobileNavBar={isActiveMobileNavBar}/>
      <UserCards />
      <Popup isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup}/>
      <Button text={"+"} classname={styles.buttonOpenPopup} handleClick={handleButtonAddUserClick}/>
      <Button text={isActiveMobileNavBar ? "<" : ">"} classname={`${styles.buttonNavBar}`} handleClick={handleButtonNavBarClick}/>
    </section>
  );
}

export default MainPage;
