import type { TUser } from '../../assets/types'
import styles from './UserCard.module.scss'

type TProps = TUser

function UserCard({name, email, surname, login, _id, group}: TProps) {
  return (
    <div className={styles.container}>
      
    </div>
  )
};

export default UserCard
