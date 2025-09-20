import styles from "./SubmitButton.module.scss"

type TProps = {
    text: string;
}

function SubmitButton({ text }: TProps) {
  return (
    <div className={styles.container}>
      <button className={styles.button}>{text}</button>
    </div>
  )
};

export default SubmitButton
