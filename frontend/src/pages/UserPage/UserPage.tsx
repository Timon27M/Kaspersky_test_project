import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserPage.module.scss";
import { useEffect } from "react";
import { useAppDispatch } from "../../assets/hooks/redux-hooks";
import { deleteUser, getUser } from "../../store/thunks";
import UserInfo from "../../components/UserInfo/UserInfo";
import Button from "../../components/ui-kit/Button/Button";

function UserPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    } else {
      console.error("Не передан id в url");
      navigate("/");
    }
  }, []);

  function handleButtonDeleteClick() {
    if (userId) {
      dispatch(deleteUser(userId));
      navigate("/")
    }
    navigate("/")
  }

  function handleButtonBackClick() {
    navigate("/");
  }
  return (
    <section className={styles.section}>
      <UserInfo />
      <Button
        text="Назад"
        classname={`${styles.button}  ${styles.buttonBack}`}
        handleClick={handleButtonBackClick}
      />
      <Button
        text="Удалить пользователя"
        classname={`${styles.button}  ${styles.buttonDelete}`}
        handleClick={handleButtonDeleteClick}
      />
    </section>
  );
}

export default UserPage;
