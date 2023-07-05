import { createElement, Component} from "react";

function ToBoard (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    const pointElement = document.querySelector("#points")
    if ( pointElement ) {
        pointElement.innerHTML = String(result);
    }
    return result;
  };
  return descriptor;
}

function Logger(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    console.log(result);
    return result;
  };
  return descriptor;
}

interface PropsBall {
  onClick: () => unknown
}

class Ball extends Component<PropsBall> {
  
  public constructor(props: PropsBall) {
    super(props);
  }

  public render() {
    return createElement("div", {
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
      onClick: () => this.props.onClick()
    })
  }
}

class Board extends Component {
  
  public constructor(props = {}) {
    super(props);
  }

  public render() {
    return createElement("div", {
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
    }, [ createElement(Point) ])
  }
}

class Point extends Component {
  
  static point: number = 0;
  
  public constructor(props = {}) {
    super(props);
  }

  public render() {
      return createElement("div", {
        style : {
          color: "black",
          fontSize: "70px",
          fontWeight: 'bold',
          fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI'",
        },
        id: 'points'
      }, [0])
    }

  @Logger
  @ToBoard
  public static plus() : number {
    return this.point += 1;
  }
}

class Background extends Component {

  public constructor(props = {}) {
    super(props);
  }
  
  public render() {
    return createElement(
      "div",
      {
        style: {
          backgroundColor: "black",
          height: "100vh",
          width: "100%",
          position: "relative",
        },
      },
      [
        createElement(Ball, {
          onClick: () => Point.plus(),
        }),
        createElement(Board),
      ]
    );
  }
}

class Objeto extends Component {

  public constructor(props: any) {
    super(props);
    Objeto.print()
  }

  public static print(): string {
      return "teste"
  }

  render() {
    return (new Background()).render()
  }
}

export default Objeto;
