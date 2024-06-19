export default function Header({state}: {state: number}) {
    return(
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            alignItems: "center",
            height: "5vh",
            width: "100vw",
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