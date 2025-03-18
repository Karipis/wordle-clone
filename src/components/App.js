import '../style/App.css';
import GuessRow from './GuessRow';
import Keyboard from './Keyboard';
import {
  useEffect,
  useState
} from 'react';

function App() {
  const [gameOver, setGameover] = useState(false);
  const [word, setWord] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState('');
  const [active, setActive] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ]);

  const [guesses, setGuesses] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ]);
  const [colors, setColors] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ]);
  const [currentRow, setCurrentRow] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    fetch('https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase')
      .then((response) => response.json())
      .then(json => {
        if (json.length > 0) {
          setWord(json[0].toUpperCase().split("")); // Convert to uppercase & split
          console.log(`Word is: ${json[0]}`);
        }
      })
      .catch(error => console.error("Error fetching word:", error));
  }, []);

  const handleClick = (event) => {
    assignLetter(event.target.textContent);
  };

  function assignLetter(letter) {
    if (letterIndex < 5 && currentRow < 5 && !gameOver) {
      const newGuesses = [...guesses];
      newGuesses[currentRow][letterIndex] = letter.toUpperCase();
      setGuesses(newGuesses);
      setLetterIndex(letterIndex + 1);
    }
  }

  function enterWord() {
    if (letterIndex === 5 && currentRow < 5 && !gameOver) {
      const newActive = [...active];
      const newColors = [...colors];

      newActive[currentRow] = ["flip", "flip", "flip", "flip", "flip"];

      for (let i = 0; i < 5; i++) {
        if (guesses[currentRow][i] === word[i]) {
          newColors[currentRow][i] = "green";
        } else if (word.includes(guesses[currentRow][i])) {
          newColors[currentRow][i] = "yellow";
        } else {
          newColors[currentRow][i] = "gray";
        }
      }

      if (checkWin()) {
        setGameover(true);
        setMessage("Congratulations! You found the word!");
      } else if (currentRow === 4) {
        setGameover(true);
        let tempWord = word.join("");
        setMessage(`Game over! The word was: ${tempWord}`);
      }


      setActive(newActive);
      setColors(newColors);
      setCurrentRow(currentRow + 1);
      setLetterIndex(0);
    }
  }


  function removeLetter() {
    if (letterIndex > 0) {
      const newGuesses = [...guesses];
      newGuesses[currentRow][letterIndex - 1] = '';
      setGuesses(newGuesses);
      setLetterIndex(letterIndex - 1);
    }
  }


  function checkWin() {
    let win = true;
    for (let i = 0; i < 5; i++) {
      if (colors[currentRow][i] !== 'green') {
        win = false
      }
    }
    return win;
  }

  function resetGame() {
    setGameover(false);
    setWord(["", "", "", "", ""]);
    setMessage('');
    setActive([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]);

    setGuesses([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]);
    setColors([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]);
    setCurrentRow(0);
    setLetterIndex(0);
    fetch('https://random-word-api.herokuapp.com/word?length=5')
      .then((response) => response.json())
      .then(json => {
        if (json.length > 0) {
          setWord(json[0].toUpperCase().split("")); // Convert to uppercase & split
        }
      })
      .catch(error => console.error("Error fetching word:", error));
  }
  
  return (
    <div className="App">
      <h1 id='title'>W<span id='o'>O</span><span id='r'>R</span>D<span id='l'>L</span><span id='e'>E</span></h1>
      <div id='guess-container'>
        {guesses.map((guess, index) => (
          <GuessRow key={index} guess={guess} color={colors[index]} active={active[index]}/>
        ))}
      </div>
      <h2 id='message'>{message}</h2>
      {gameOver && <button id='play' onClick={resetGame}>Play again</button>}
      <Keyboard enterWord={enterWord} removeLetter={removeLetter} handleClick={handleClick}/>
    </div>
  );
}

export default App;
