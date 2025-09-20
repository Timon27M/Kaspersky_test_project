import { useEffect } from "react";
import styles from "./UserCards.module.scss";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/redux-hooks";
import { getUsers } from "../../store/thunks";
import UserCard from "../UserCard/UserCard";
import SearchInput from "../SearchInput/SearchInput";
import { getUsersByGroup } from "../../store/selectors";

function UserCards() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsersByGroup);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={styles.container}>
      <SearchInput />
      <div className={styles.cardList}>
        {users.map((user) => {
          return (
            <div className={styles.card} key={user._id}>
              <UserCard
                name={user.name}
                surname={user.surname}
                group={user.group ? user.group : "unknown"}
                login={user.login}
                id={user._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserCards;
