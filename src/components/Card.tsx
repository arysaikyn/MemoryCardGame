import { Dispatch, SetStateAction, useState } from 'react';
import "../App.css"

import img0 from '../assets/0.png';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';

const images = [img0, img1, img2, img3, img4, img5, img6, img7];

export default function Card({url, name, setScore, checkedCards, setCheckedCards}: {url: string, name: string, setScore: Dispatch<SetStateAction<number>>,checkedCards: Array<string>, setCheckedCards: Dispatch<SetStateAction<Array<string>>>}) {
    const randomIndex = Math.floor(Math.random() * 8);
    const [eye, setEye] = useState(images[randomIndex]);
    const [hover, setHover] = useState(false);

    return(
        <div style={{
            backgroundImage: `url(${eye}), url(${url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            border: "10px solid black",
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)",
            borderRadius: "50%",
            height: "200px",
            width: "200px",
            transform: hover ? "scale(1.2)" : "",
        }}
        onMouseEnter={() => {
            setHover(true);
            setEye(images[randomIndex]);
        }}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
            if(!checkedCards.includes(name)){
                setCheckedCards([...checkedCards, name])
                setScore(prevScore => prevScore + 1);
            }
            else{
                setScore(0);
            }
        }}
        >
        </div>
    )
}