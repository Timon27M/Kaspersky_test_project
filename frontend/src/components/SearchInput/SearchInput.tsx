import styles from "./SearchInput.module.scss";
import { useAppDispatch } from "../../assets/hooks/redux-hooks";
import type { ChangeEvent } from "react";
import { setValue } from "../../store/searchSlice/searchSlice";

function SearchInput() {

    const dispatch = useAppDispatch()

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(setValue(evt.target.value))
  }
  return (
    <div className={styles.container}>
      <input placeholder="Поиск" type="text" className={styles.input} onChange={handleChange} />
    </div>
  );
}

export default SearchInput;
