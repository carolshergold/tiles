import '../App.css';

export default function StartPage ({pageTitle, generateTileSet}) {

  return(
    <div>
      <h1>{pageTitle}</h1>
      <hr />
      <button onClick={generateTileSet}>Play</button>
    </div>
  ) 




};