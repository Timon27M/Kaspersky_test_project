import { FormProvider, useForm } from "react-hook-form";
import styles from "./UserInfo.module.scss";
import { useEffect, useState } from "react";
import UserInfoInput from "../ui-kit/UserInfoInput/UserInfoInput";
import type { TUser } from "../../assets/types";
import SubmitButton from "../ui-kit/SubmitButton/SubmitButton";
import { useAppDispatch, useAppSelector } from "../../assets/hooks/redux-hooks";
import { getUserDataSelector, getUserIdSelector } from "../../store/userSlice/userSlice";
import { updateUser } from "../../store/thunks";

function UserInfo() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserIdSelector)

  const methods = useForm<TUser>({
    mode: "onBlur",
  });

  const { reset, handleSubmit } = methods;
  const userData = useAppSelector(getUserDataSelector);

  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [textButtonChangeData, setTextButtonChangeData] =
    useState("Изменить данные");

  function submitForm(data: TUser) {
    if (!isInputDisabled) {
      dispatch(updateUser({...data, _id: userId}));
      setTextButtonChangeData("Изменить данные");
    } else {
      setTextButtonChangeData("Сохранить данные");
    }

    setIsInputDisabled(!isInputDisabled);
  }

  useEffect(() => {
    const { name, surname, login, email, group } = userData || {};
    reset({
      name,
      surname,
      login,
      email,
      group,
    });
  }, [reset, userData]);

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
        <div className={styles.inputBlock}>
          <p className={styles.inputText}>Имя:</p>
          <UserInfoInput name="name" disabled={isInputDisabled} />
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.inputText}>Фамилия:</p>
          <UserInfoInput name="surname" disabled={isInputDisabled} />
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.inputText}>Почта:</p>
          <UserInfoInput name="email" disabled={isInputDisabled} />
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.inputText}>Логин:</p>
          <UserInfoInput name="login" disabled={isInputDisabled} />
        </div>
        <div className={styles.inputBlock}>
          <p className={styles.inputText}>Группа:</p>
          <UserInfoInput name="group" disabled={isInputDisabled} />
        </div>
        <SubmitButton text={textButtonChangeData} />
      </form>
    </FormProvider>
  );
}

export default UserInfo;
