import { useEffect, useState } from "react";
import { checkWin } from "../utils/helper";

interface Props {
  correctLetters: string[];
  wrongLetters: string[];
  selectedWord: string;
  setIsPlayable: (isPlayable: boolean) => void;
  playAgain: () => void;
  isPlayable: boolean;
  setLevel: (level: "easy" | "medium" | "hard" | undefined) => void;
}

const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setIsPlayable,
  playAgain,
  isPlayable,
  setLevel,
}: Props) => {
  const [finalMessage, setFinalMessage] = useState<string>("");
  const [finalMessageRevealWord, setFinalMessageRevealWord] = useState<string>("");

  useEffect(() => {
    const result = checkWin(correctLetters, wrongLetters, selectedWord);

    const getResult = (finalMessage: string, revealWord: string) => {
      setFinalMessage(finalMessage);
      setFinalMessageRevealWord(revealWord);

      setIsPlayable(false);
      setLevel(undefined);
    };
    if (result === "win") {
      getResult("Congratulations! You won!", "");
    } else if (result === "lose") {
      getResult("You lost.", `...the word was: ${selectedWord}`);
    }
  }, [correctLetters, setLevel, wrongLetters, selectedWord, setIsPlayable]);

  useEffect(() => {
    setIsPlayable(true);
  }, []);

  return (
    <div className="popup-container" style={!isPlayable ? { display: "flex" } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
