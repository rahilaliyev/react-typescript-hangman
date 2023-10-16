interface Props {
  wrongLetters: string[];
}

const WrongLetters = ({ wrongLetters }: Props) => {
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && <p>Wrong</p>}
        {wrongLetters
          .map((letter, key) => <span key={key}>{letter}</span>)
          .reduce(
            (prev: React.ReactNode | null, curr) => (prev === null ? [curr] : [prev, ", ", curr]),
            null
          )}
      </div>
    </div>
  );
};

export default WrongLetters;
