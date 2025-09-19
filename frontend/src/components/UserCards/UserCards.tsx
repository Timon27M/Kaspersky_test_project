import { useEffect } from "react";
import styles from "./UserCards.module.scss";
import { useAppDispatch } from "../../assets/hooks/redux-hooks";
import { getUsers } from "../../store/thunks";
import UserCard from "../UserCard/UserCard";

function UserCards() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
  <div className={styles.container}>
    <UserCard />
  </div>
);
}

export default UserCards;
