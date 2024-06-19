import headerImage from '../assets/header.png';

export default function Header({state}: {state: number}) {
    return(
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            alignItems: "center",
            height: "5vh",
            width: "100vw",
            // backgroundImage: `url(${headerImage})`,
            // backgroundSize: "300px",
            backgroundColor: "black",
            fontFamily: "clashRoyaleFont",
            color: "white",
            WebkitTextStroke: "1px black",
            fontSize: "20px"
        }}>
            Memory Card Game
            <div>
                Total Score:{state}
            </div>
        </div>
    )
}