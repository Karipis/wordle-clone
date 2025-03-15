import '../style/Keyboard.css';

function Keyboard({ enterWord, removeLetter, handleClick }) {
    return (
        <div id='key-container'>
            <div className='key-row'>
                <div className='key' onClick={handleClick}>Q</div>
                <div className='key' onClick={handleClick}>W</div>
                <div className='key' onClick={handleClick}>E</div>
                <div className='key' onClick={handleClick}>R</div>
                <div className='key' onClick={handleClick}>T</div>
                <div className='key' onClick={handleClick}>Y</div>
                <div className='key' onClick={handleClick}>U</div>
                <div className='key' onClick={handleClick}>I</div>
                <div className='key' onClick={handleClick}>O</div>
                <div className='key' onClick={handleClick}>P</div>
            </div>   
            <div className='key-row'>
                <div className='key' onClick={handleClick}>A</div>
                <div className='key' onClick={handleClick}>S</div>
                <div className='key' onClick={handleClick}>D</div>
                <div className='key' onClick={handleClick}>F</div>
                <div className='key' onClick={handleClick}>G</div>
                <div className='key' onClick={handleClick}>H</div>
                <div className='key' onClick={handleClick}>J</div>
                <div className='key' onClick={handleClick}>K</div>
                <div className='key' onClick={handleClick}>L</div>
            </div>  
            <div className='key-row'>
                <div className='key big green' onClick={enterWord}><i id='enter' className="fa-solid fa-arrow-left"></i></div>
                <div className='key' onClick={handleClick}>Z</div>
                <div className='key' onClick={handleClick}>X</div>
                <div className='key' onClick={handleClick}>C</div>
                <div className='key' onClick={handleClick}>V</div>
                <div className='key' onClick={handleClick}>B</div>
                <div className='key' onClick={handleClick}>N</div>
                <div className='key' onClick={handleClick}>M</div>
                <div className='key big yellow' onClick={removeLetter}><i  className="fa-solid fa-delete-left"></i></div>
            </div>    
        </div>
    );
}

export default Keyboard;
