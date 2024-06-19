import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Card from "./Card"
const url = "https://restcountries.com/v3.1/all"

function shuffle(stuff: number[]) {
    let currentIndex = stuff.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [stuff[currentIndex], stuff[randomIndex]] = [
      stuff[randomIndex], stuff[currentIndex]];
  }
}

const randomIndexes = Array.from({length: 12}, () => Math.floor(Math.random() * 250));

export default function Body({state, setState, checkedCards, setCheckedCards}: {
    state: number;
    setState: Dispatch<SetStateAction<number>>;
    checkedCards: Array<string>; // Update the type to Array<string>
    setCheckedCards: Dispatch<SetStateAction<Array<string>>> // Update the type to Dispatch<SetStateAction<Array<string>>>
  }) {
    const [countries, setCountries] = useState<Array<object>>(Array.from({length: 12}, () => ({})));
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      shuffle(randomIndexes);

      fetch(url, {
        method: "GET",
        mode: "cors",
      })
      .then((response) => response.json())
      .then(data => {
        setCountries(randomIndexes.map(randomIndex => data[randomIndex]));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      })
    }, [state, isLoading]);

    return(
        <div style={{
            width: "100vw",
            height: "95vh",
            backgroundColor: "white",
            display: "flex",
            flexWrap: "wrap",
            gap: "100px",
            justifyContent: "center",
            alignContent: "flex-start",
            paddingTop: "100px"
        }}>
          {isLoading ? <div>Loading</div> :
          countries.map(country => {
            return <Card url={(country as { flags: { png: string } }).flags.png} name={(country as { name: { common: string } }).name.common} setScore={setState} checkedCards={checkedCards} setCheckedCards={setCheckedCards}/>
          })}
          {state == 12 &&
          <div style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            opacity: "0.5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0",
            left: "0",
            color: "white",
            fontSize: "50px"
          }}>
            You won!
            <button style={{
              width: "100px",
              height: "50px"
            }}
            onClick={() => window.location.reload()}>Restart?</button>
          </div>}
        </div>
    )
}