import { useFormContext } from 'react-hook-form';
import styles from './UserInfoInput.module.scss'
import type { TUserWithoutId } from '../../../assets/types';

type TProps = {
    disabled?: boolean;
    name: "name" | "surname" | "login" | "email" | "group";
    required?: boolean;
}

function UserInfoInput({ name, disabled = false, required }: TProps) {
    const { register } = useFormContext<TUserWithoutId>();
  return (
    <div className={styles.container}>
        <input required={required} {...register(name)} type="text" className={`${styles.input} ${disabled && styles.inputDisabled}`} disabled={disabled} />
    </div>
  )
};

export default UserInfoInput
