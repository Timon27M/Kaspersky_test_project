import { useEffect } from "react";
import styles from "./UserCards.module.scss";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/redux-hooks";
import { createMockUsers, getUsers } from "../../store/thunks";
import UserCard from "../UserCard/UserCard";
import SearchInput from "../SearchInput/SearchInput";
import { getUsersByGroup } from "../../store/selectors";
import Button from "../ui-kit/Button/Button";
import {
  getErrorMessage,
  getIsLoading,
} from "../../store/usersSlice/usersSlice";

function UserCards() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsersByGroup);

  const isLoading = useAppSelector(getIsLoading);
  const errorMessage = useAppSelector(getErrorMessage);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  function handleClickButtonMockData() {
    dispatch(createMockUsers());
  }

  return (
    <div className={styles.container}>
      <SearchInput />
      <div className={styles.cardList}>
        {isLoading ? (
          <p>...Загрузка</p>
        ) : !errorMessage ? (
          users.length !== 0 ? (
            users.map((user) => {
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
            })
          ) : (
            <Button
              text="Добавить тестовых пользователей"
              classname={styles.buttonAddMockData}
              handleClick={handleClickButtonMockData}
            />
          )
        ) : (
          <p>{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default UserCards;
