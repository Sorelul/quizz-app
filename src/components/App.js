import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
    questions: [],
    // 'loading' , 'error', 'ready', 'active', 'finished'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case "datafailed":
            return {
                ...state,
                status: "error",
            };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        case "newAnswer":
            const question = state.questions.at(state.index);
            const isCorrect = action.payload === question.correctOption;

            return {
                ...state,
                answer: action.payload,
                points: isCorrect ? state.points + question.points : state.points,
            };
        case "nextQuestion":
            const nextQuestion = state.index + 1;
            const totalQuestions = state.questions.length;

            if (nextQuestion >= totalQuestions) {
                return {
                    ...state,
                    status: "finished",
                    highscore: state.points > state.highscore ? state.points : state.highscore,
                };
            } else {
                return {
                    ...state,
                    index: nextQuestion,
                    answer: null,
                };
            }
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
                highscore: state.highscore,
            };
        case "tick":
            const remaining_time = state.secondsRemaining - 1;

            return {
                ...state,
                secondsRemaining: remaining_time,
                status: remaining_time === 0 ? "finished" : state.status,
            };
        default:
            return new Error("Invalid action type");
    }
}

export default function App() {
    const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    useEffect(() => {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => dispatch({ type: "datafailed" }));
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
                {status === "active" && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Question question={questions.at(index)} dispatch={dispatch} answer={answer} />
                        <Footer>
                            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
                        </Footer>
                    </>
                )}

                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
