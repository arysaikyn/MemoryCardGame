import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Card from "./Card"
const url = "https://restcountries.com/v3.1/all"

function shuffle(stuff: any[]) {
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
    checkedCards: Array<object>;
    setCheckedCards: Dispatch<SetStateAction<Array<object>>>
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
        </div>
    )
}