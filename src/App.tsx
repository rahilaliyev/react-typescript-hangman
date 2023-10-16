import { useState, useEffect } from "react";
import Header from "./components/header";
import Figure from "./components/figure";
import WrongLetters from "./components/wrongLetters";
import Word from "./components/word";
import Popup from "./components/popup";
import Notification from "./components/notification";
import { showNotificationFunc } from "./utils/helper";
import LevelPopup from "./components/levelPopup";

import "./App.css";
import { LEVELS_OBJ } from "./utils/constants";

function App() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard" | undefined>();
  const [selectedWord, setSelectedWord] = useState<string | undefined>();
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [isLevelPopup, setIsLevelPopup] = useState<boolean>(true);
  const [isPlayable, setIsPlayable] = useState<boolean>(true);
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);

  const getWord = async () => {
    try {
      if (level !== undefined) {
        const lengthParam = LEVELS_OBJ[level];
        const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${lengthParam}`);
        const data = await response.json();
        setSelectedWord(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (level) {
      getWord();
    }
  }, [level]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const { key, keyCode } = e;
      if (isPlayable && level && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord?.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            showNotificationFunc(setIsShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            showNotificationFunc(setIsShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, isPlayable, selectedWord, level]);

  function playAgain() {
    setIsPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setIsLevelPopup(true);

    getWord();
  }

    const choisingLevel = (level: 'easy' | 'medium' | 'hard' ) => {
      setLevel(level);
      setIsLevelPopup(false);
    };

  return (
    <div className="App">
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord || ""} correctLetters={correctLetters} />
      </div>
      <LevelPopup isLevelPopup={isLevelPopup} choisingLevel={choisingLevel} />
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord || ""}
        isPlayable={isPlayable}
        playAgain={playAgain}
        setIsPlayable={setIsPlayable}
        setLevel={setLevel}
      />
      <Notification isShowNotification={isShowNotification} />
    </div>
  );
}

export default App;
