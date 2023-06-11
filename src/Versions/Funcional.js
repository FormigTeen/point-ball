import {createElement} from "react";

let globalState = {
    points: 0
}

const useGlobalState = (aFunction) => (...args) => aFunction(...args, globalState)

const setGlobalState = (aFunction) => globalState = {...globalState, ...(aFunction())}
const callFunc = (callable) => callable()
const querySelector = (args) => document.querySelector(args)

const getPointsOnState = () => (_ => _.points) |> useGlobalState |> callFunc

const add = (number) => (toAdd) => number + toAdd

const setPointsOnState = points =>
    (_ => ({..._, points: points}))
        |> useGlobalState
        |> setGlobalState


const setInner = (value) => (element) => isNotNull(element) ? element.innerHTML = value : value

const isNotNull = _ => !!_
const addStyle = (key, value) => (props) => ({...props, style: {...(props.style || {}), [key]: value }})

const addId = (value) => (props) => ({...props, id: value})

const addEvent = (event, value) => (props) => ({...props, [event]: value})

const getEmptyProps = () => ({})

const getFactoryTo = (type) => (props) => (children = []) => createElement(type, props, ...children)

const addChildToFactory = (aChildFactory) => (getFactoryCallable) => (children = []) => getFactoryCallable([...children, aChildFactory |> callFunc])

const Funcional = () => {
    const getPointFactory =
        getEmptyProps()
            |> addStyle('color', 'black')
            |> addStyle('fontSize', '70px')
            |> addStyle('fontWeight', 'bold')
            |> addStyle('fontFamily', "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif")
            |> addId("points")
            |> getFactoryTo("div")
            |> addChildToFactory(getPointsOnState)

    const BallFactory = 
        getEmptyProps()
            |> addStyle('position', 'absolute')
            |> addStyle('top', '50%')
            |> addStyle('left', '50%')
            |> addStyle('transform', "translate(-50%, -50%)")
            |> addStyle('width', '100px')
            |> addStyle('height', '100px')
            |> addStyle('borderRadius', '50%')
            |> addStyle('backgroundColor', 'white')
            |> addEvent(
                'onClick',
                () => querySelector("#points")|> setInner(getPointsOnState() |> add(1) |> setPointsOnState |> getPointsOnState)
            )
            |> getFactoryTo("div")

    const BoardFactory = 
        getEmptyProps()
            |> addStyle("position", "absolute")
            |> addStyle("top", "150px")
            |> addStyle("right", "150px")
            |>addStyle("width", "150px")
            |> addStyle("height", "150px")
            |> addStyle("backgroundColor", "white")
            |> addStyle("display", "flex")
            |> addStyle("justifyContent", "center")
            |> addStyle("alignItems", "center")
            |> getFactoryTo("div")
            |> addChildToFactory(getPointFactory)


    const BackgroundFactory = 
        getEmptyProps()
            |> addStyle("backgroundColor", "black")
            |> addStyle("height", "100vh")
            |> addStyle("width", "100%")
            |> addStyle("position", "relative")
            |> getFactoryTo("div")
            |> addChildToFactory(BoardFactory)
            |> addChildToFactory(BallFactory)

    return BackgroundFactory()
}

export default Funcional
