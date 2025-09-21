import { useNavigate } from "react-router-dom";
import type { TUserGroup } from "../../assets/types";
import styles from "./UserCard.module.scss";

type TProps = {
  name: string;
  surname: string;
  login: string;
  group: TUserGroup;
  id: string;
};

function UserCard({ name, group, surname, login, id }: TProps) {

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/user/${id}`)
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.nameBlock}>
        <p>{name}</p>
        <p>{surname}</p>
      </div>
      <div className={styles.infoBlock}>
        <p> login: {login}</p>
        <p>group: {group}</p>
      </div>
    </div>
  );
}

export default UserCard;
