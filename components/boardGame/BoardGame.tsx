"use client";

import { FC, useRef, useState } from "react";
import styles from "./board.module.css";
import Square from "../square/Square";

const TURNS = {
  X: "X",
  O: "O",
};

const WINNER_SETS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

interface BoardProps {}

const BoardGame: FC<BoardProps> = () => {
  const [board, setBoard] = useState<any[]>(() =>
    window.localStorage.getItem("board")
      ? JSON.parse(window.localStorage.getItem("board") || "[]")
      : new Array(9).fill(null)
  );
  const [turn, setTurn] = useState(() =>
    window.localStorage.getItem("turn")
      ? window.localStorage.getItem("turn")
      : TURNS.X
  );
  const [winner, setWinner] = useState(false);
  const ref = useRef<HTMLDialogElement | null>(null);

  const checkWinner = (newBoard: any[]) => {
    WINNER_SETS.forEach((set) => {
      if (
        newBoard[set[0]] &&
        newBoard[set[0]] === newBoard[set[1]] &&
        newBoard[set[0]] === newBoard[set[2]]
      ) {
        setWinner(true);
        ref.current?.showModal();
        return;
      }
    });
  };

  const updateBoard = (board: any[], index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    checkWinner(newBoard);

    window.localStorage.setItem("board", JSON.stringify(board));
    window.localStorage.setItem("turn", JSON.stringify(newTurn));
  };

  const resetGame = () => {
    setBoard(new Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(false);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <main className={styles.boardMain}>
      <section>
        <h1 className={styles.boardTitle}>Tic Tac Toe</h1>
      </section>
      <section className={styles.boardBody}>
        {board.map((value, index) => (
          <Square
            key={`square-${index}`}
            value={value}
            index={index}
            board={board}
            updateBoard={updateBoard}
          />
        ))}
      </section>
      <section>
        <strong className={styles.boardTurn}>Turn: {turn}</strong>
      </section>
      <section>
        <button className={styles.boardButton} onClick={resetGame}>
          Reset game
        </button>
      </section>
      <dialog ref={ref} className={styles.dialog}>
        <div className={styles.dialogBody}>
          <h2>Winner is {turn} !!!!</h2>
          <button onClick={() => ref.current?.close()}>close</button>
        </div>
      </dialog>
    </main>
  );
};

export default BoardGame;
