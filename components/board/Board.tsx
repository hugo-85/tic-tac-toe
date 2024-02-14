import { FC } from "react";
import styles from "./board.module.css";

interface BoardProps {}

const Board: FC<BoardProps> = () => {
  return <main className={styles.main}></main>;
};

export default Board;
