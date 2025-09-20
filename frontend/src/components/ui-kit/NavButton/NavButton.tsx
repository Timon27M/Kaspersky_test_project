import {
  useAppDispatch,
  useAppSelector,
} from "../../../assets/hooks/redux-hooks";
import {
  getActiveUserCardsSelector,
  setActiveUserCardsName,
} from "../../../store/usersSlice/usersSlice";
import styles from "./NavButton.module.scss";

type TProps = {
  text: string;
  name: string;
};

function NavButton({ text, name }: TProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setActiveUserCardsName(name));
    sessionStorage.setItem("activeUsersgroup", name)
  }

  const activeUsersgroup = useAppSelector(getActiveUserCardsSelector);

  return (
    <>
      <button
        className={`${styles.button} ${
          activeUsersgroup === name && styles.buttonActive
        }`}
        onClick={handleClick}
      >
        {text}
      </button>
    </>
  );
}

export default NavButton;
