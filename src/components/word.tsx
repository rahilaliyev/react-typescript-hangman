interface Props {
  selectedWord: string;
  correctLetters: string[];
}

const Word = ({ selectedWord, correctLetters }: Props) => (
  <div className="word">
    {selectedWord?.split("")?.map((letter, key) => (
      <span className="letter" key={key}>
        {correctLetters.includes(letter) ? letter : ""}
      </span>
    ))}
  </div>
);

export default Word;
