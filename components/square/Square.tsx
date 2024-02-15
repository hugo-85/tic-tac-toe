import { FC } from "react";
import styles from "./square.module.css";

interface SquareProps {
  value: string | null;
  board: any[];
  index: number;
  updateBoard: (board: any[], index: number) => void;
}

const Square: FC<SquareProps> = ({ board, value, index, updateBoard }) => {
  return (
    <div className={styles.squareBox} onClick={() => updateBoard(board, index)}>
      {value}
    </div>
  );
};

export default Square;
