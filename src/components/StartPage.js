import '../App.css';

export default function StartPage ({pageTitle, startNewGame}) {

  return(
    <div>
      <h1>{pageTitle}</h1>
      <hr />
      <button onClick={startNewGame}>Play</button>
    </div>
  ) 




};