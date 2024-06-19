import { useState } from 'react'
import './App.css'
import { Body, Header } from "./components/index.tsx"


function App() {
  const [score, setScore] = useState(0);
  const [checkedCards, setCheckedCards] = useState([]);

  return (
    <>
      <Header state={score}/>
      <Body state={score} setState={setScore} checkedCards={checkedCards} setCheckedCards={setCheckedCards}/>
    </>
  )
}

export default App
