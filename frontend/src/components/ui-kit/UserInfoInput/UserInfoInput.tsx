import { useFormContext } from 'react-hook-form';
import styles from './UserInfoInput.module.scss'
import type { TUser } from '../../../assets/types';

type TProps = {
    disabled: boolean;
    name: "name" | "surname" | "login" | "email" | "group" | "_id";
}

function UserInfoInput({ name, disabled }: TProps) {
    const { register } = useFormContext<TUser>();
  return (
    <div className={styles.container}>
        <input {...register(name)} type="text" className={`${styles.input} ${disabled && styles.inputDisabled}`} disabled={disabled} />
    </div>
  )
};

export default UserInfoInput
