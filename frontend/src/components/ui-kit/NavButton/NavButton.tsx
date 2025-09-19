import {
  useAppDispatch,
  useAppSelector,
} from "../../../assets/hooks/redux-hooks";
import {
  activeUserSelector,
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
  }

  const activeUsersgroup = useAppSelector(activeUserSelector);

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
