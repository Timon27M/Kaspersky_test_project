import { useParams } from "react-router-dom";
import styles from "./UserPage.module.scss"

function UserPage() {

    const { userId } = useParams<{ userId: string }>();
  return (
    <section className={styles.section}>
      
    </section>
  )
};

export default UserPage
