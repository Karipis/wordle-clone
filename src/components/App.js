import '../style/App.css';
import GuessRow from './GuessRow';
import Keyboard from './Keyboard';
import { useEffect, useState } from 'react';

function App() {
  const [word, setWord] = useState(["", "", "", "", ""]);
  const [message,setMessage] = useState('');
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
    fetch('https://random-word-api.herokuapp.com/word?length=5')
      .then((response) => response.json())
      .then(json => {
        if (json.length > 0) {
          setWord(json[0].toUpperCase().split("")); // Convert to uppercase & split
        }
      })
      .catch(error => console.error("Error fetching word:", error));
  }, []);

  const handleClick = (event) => {
    assignLetter(event.target.textContent);
  };

  function assignLetter(letter) {
    if (letterIndex < 5 && currentRow < 5) {
      const newGuesses = [...guesses];
      newGuesses[currentRow][letterIndex] = letter.toUpperCase();
      setGuesses(newGuesses);
      setLetterIndex(letterIndex + 1);
    }
  }

  function enterWord() {
    if (letterIndex === 5 && currentRow < 5) {
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
          setMessage("Congratulations! You found the word!");
      } else if (currentRow === 4) {  // Check if this is the last attempt
          let tempWord = word.join(""); // Convert array to string
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

  function checkWin(){
    let win = true;
    for(let i=0; i<5; i++){
      if(colors[currentRow][i] !== 'green'){
        win = false
      }
    }
    return win;
  }

  console.log(word);
  return (
    <div className="App">
      <h1 id='title'>W<span id='o'>O</span><span id='r'>R</span>D<span id='l'>L</span><span id='e'>E</span></h1>
      <div id='guess-container'>
        {guesses.map((guess, index) => (
          <GuessRow key={index} guess={guess} color={colors[index]} active={active[index]}/>
        ))}
      </div>
      <h2>{message}</h2>
      <Keyboard enterWord={enterWord} removeLetter={removeLetter} handleClick={handleClick}/>
    </div>
  );
}

export default App;
