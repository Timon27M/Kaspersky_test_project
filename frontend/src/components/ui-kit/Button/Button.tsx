import styles from './Button.module.scss'

type TProps = {
    text: string;
    classname: string;
    handleClick: () => void;
}

function Button({ text, classname, handleClick }: TProps) {
  return (
    <button className={classname} onClick={handleClick}>{text}</button>
  )
};

export default Button
