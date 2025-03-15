import '../style/GuessRow.css';

function GuessRow(props) {
  return (
    <div id='guess-row'>
      {props.guess.map((letter, index) => (
        <div key={index} className={`square ${props.color[index]}`}>
          {letter}
        </div>
      ))}
    </div>
  );
}

export default GuessRow;
