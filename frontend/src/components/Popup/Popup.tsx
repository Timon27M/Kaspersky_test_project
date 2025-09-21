import { FormProvider, useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import styles from "./Popup.module.scss";
import type { TUserGroup, TUserWithoutId } from "../../assets/types";
import UserInfoInput from "../ui-kit/UserInfoInput/UserInfoInput";
import SubmitButton from "../ui-kit/SubmitButton/SubmitButton";
import { useAppDispatch } from "../../assets/hooks/redux-hooks";
import { createUser } from "../../store/thunks";

type TProps = {
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;

  isOpenPopup: boolean;
};

type TUserdd = {
    name: string;
    email: string;
    login: string;
    surname: string;
    group?: TUserGroup | ""; // 👈 теперь пустая строка допустима
  };

function Popup({ setIsOpenPopup, isOpenPopup }: TProps) {
  const dispatch = useAppDispatch();

  const methods = useForm<TUserWithoutId>({
    mode: "onBlur",
  });

  if (!isOpenPopup) return null;

  const { handleSubmit } = methods;

  function submitForm(data: TUserdd) {
    const userData = {
      ...data,
      group: data.group === "" ? undefined : data.group,
    };
    dispatch(createUser(userData));
    setIsOpenPopup(false);
  }

  function handleOverlayClick(evt: React.MouseEvent<HTMLDivElement>) {
    evt.stopPropagation();

    setIsOpenPopup(false);
  }

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.overlay} onClick={handleOverlayClick}></div>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <h2>Добавить нового пользователя</h2>
          <div className={styles.inputBlock}>
            <p className={styles.inputText}>Имя:</p>
            <UserInfoInput name="name" required={true} />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputText}>Фамилия:</p>
            <UserInfoInput name="surname" required={true} />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputText}>Почта:</p>
            <UserInfoInput name="email" />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputText}>Логин:</p>
            <UserInfoInput name="login" required={true} />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.inputText}>Группа:</p>
            <UserInfoInput name="group" />
          </div>
          <SubmitButton text="Сохранить" />
        </form>
      </FormProvider>
    </div>,
    document.body
  );
}

export default Popup;
