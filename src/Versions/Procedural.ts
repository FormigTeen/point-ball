import { createElement } from "react";

var score = 0;
function querySelector (args: string) {
    return document.querySelector(args)
}

function processClick(){
    const pointElement = querySelector("#points")
    if ( pointElement ) {
        score = score + 1
        pointElement.innerHTML = String(score);
    }
}


function Procedural() {
    const Point = createElement("div", {
        style : {
            color: "black",
            fontSize: "70px",
            fontWeight: 'bold',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        },
        id: 'points'
    }, [], score)

    const Ball = createElement("div", {
        style : {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "white"
        },
        onClick: processClick
    })

    const Board = createElement("div", {
        style : {
            position: "absolute",
            top: "150px",
            right: "150px",
            width: "150px",
            height: "150px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }, [Point])

    const Background = createElement("div", {
        style : {
            backgroundColor: "black",
            height: "100vh",
            width: "100%",
            position: "relative"
        },
    }, [Ball, Board])

    return Background
}

export default Procedural
