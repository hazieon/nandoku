import React, { useReducer, useEffect, useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import Title from "../../components/heading";
import { useParams } from "react-router-dom";
import { categories } from "../../components/menu/categories";
import { Button, Select } from "@chakra-ui/react";
import Results from "../results";

const shuffle = require("shuffle-array");

//bring in kanji as props
//on button press (start/next), display a random kanji from the array
//display random option answers from the array (or multi char input)
//show correct/incorrect on 'submit' (stretch:or time up)
//show 10 kanji per round, then show results

//useReducer state - initial text (category name kanji or some image)
//render random index of kanji array and 4 potential answers

const initialState = {
  game: false,
  rounds: 10, //up to 10 max (or customise later); if rounds <10 'next', else results
  kanji: "字",
  yomikata: "かんじ",
  kanjiSet: [],
};

const gameInitialState = {
  score: 0,
  correct: false,
  incorrect: false,
  roundSet: [], //kanji in here should not be added again as randomKanji.yomi
  submit: false, //true if data for that q has been submitted - use to disable buttons
};
//reducer function to update game state object
function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error();
    //start the game with score at 0 and gen first kanji question
    case "start":
      return {
        ...state,
        game: true,
        rounds: action.rounds,
        kanjiSet: action.set,
      };
    //next kanji
    case "setKanji":
      return {
        ...state,
        kanji: action.kanji,
        yomikata: action.answer,
      };
    case "gameOver":
      return {
        ...state,
        game: false,
        kanji: "字",
        yomikata: "かんじ",
      };
  }
}
function gameReducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        score: 0,
        correct: false,
        incorrect: false,
        roundSet: [],
        submit: false,
      };
    case "score":
      return {
        ...state,
        correct: true,
        incorrect: false,
        score: state.score + 1,
      };
    case "noScore":
      return {
        ...state,
        correct: false,
        incorrect: true,
      };
    case "nextQuestion":
      return {
        ...state,
        correct: false,
        incorrect: false,
        submit: false,
        //build an array of kanji that have been asked already
        // !!! need to check this with .includes before setting question
        // need to call this upon each generation of a randomKanji in func
        roundSet: [...state.roundSet, action.usedKanji],
      };
    case "select":
      return {
        ...state,
        submit: true,
      };
    default:
      throw new Error();
  }
}

function FlashcardPanel({ start, end }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);
  const { title } = useParams();
  const [catData, setCatData] = useState(false);
  const [answersOptions, setAnswersOptions] = useState([]);
  const [correct, setCorrect] = useState(null);
  const [rounds, setRounds] = useState(10);

  useEffect(() => {
    setCatData(
      categories.find((categoryData) => categoryData.title === title).data
    );
    console.log({ state }, "loaded ");
  }, [catData, title]);

  useEffect(() => {
    if (rounds === 0) {
      dispatch({ type: "gameOver" });
      console.log("pikachuuuuuuu 1111");
    }
  }, [rounds]);

  //make start button successfully reset the game at the end
  //set rounds set and title in app state on game end
  //sort out where game over dispatch is called (only in useEffect?)

  //function to generate a random kanji, set the answers array, shuffle and set state
  function getRandomKanji() {
    if (rounds > 0) {
      let randomKanji;
      let randomIndex = Math.floor(
        Math.random() * (catData.length - 1 - 0 + 1) + 0
      );
      console.log(state, "state");
      console.log(gameState, "game state");
      randomKanji = catData[randomIndex];
      //check if the random kanji has been used previously in the current game:
      if (gameState.roundSet.includes(randomKanji)) {
        //recursion - restart the random kanji generation if true
        console.log("duplicate! recursion time!");
        getRandomKanji();
      } else {
        // setRandomKanji(catData[randomIndex]);
        console.log(randomKanji, "random kanji not in set");

        //dispatch to set states of 'correct' and add to 'used kanji' array to track questions:
        gameDispatch({ type: "nextQuestion", usedKanji: randomKanji.kanji });
        //dispatch to set the current round's kanji:
        dispatch({
          type: "setKanji",
          kanji: randomKanji.kanji,
          answer: randomKanji.yomi,
        });
      }
      getAnswersOptions();

      function getAnswersOptions() {
        let answersArr = [randomKanji.yomi];
        while (answersArr.length < 5) {
          let randomAnswer =
            catData[
              Math.floor(Math.random() * (catData.length - 1 - 0 + 1) + 0)
            ].yomi;
          if (answersArr.includes(randomAnswer)) {
            console.log("includes");
            //recursion if already included: avoids duplicates & regenerates answers arr
            getAnswersOptions();
          } else {
            // console.log("no includes");
            // console.log(answersArr);
            // answersArr.push(randomAnswer);
            answersArr = [...answersArr, randomAnswer];
          }
        }
        console.log({ answersArr }, "answers array without duplicates");

        //shuffle the answers array using an npm package method:
        shuffle(answersArr);
        setAnswersOptions(answersArr);
      }
    } else if (rounds === 0) {
      console.log("game over!", "score:", gameState.score, gameState.roundSet);
      // dispatch({ type: "gameOver" });

      return;
    }
  }

  //function to handle whether the chosen option was correct - runs on click
  //make correct answer button bg colour green, incorrect red
  //popup 'CORRECT' or 'INCORRECT'
  //display an x or a check by buttons

  function handleResults(ans, i) {
    if (ans === state.yomikata) {
      console.log("正解です！", gameState.score);
      // console.log(answersOptions[i], "answer");
      //dispatch method updates the user's score +1 if they are correct
      gameDispatch({ type: "score" });
      setCorrect(true);
      //answersOptions[i] = `${answersOptions[i]} ☑`;
    } else {
      console.log("ばつ！");
      gameDispatch({ type: "noScore" });
      setCorrect(false);
    }
  }

  return (
    <>
      <div className={styles.backLink}>
        <Link className={styles.link} to={"/"}>
          ⇦
        </Link>
      </div>
      <div className={styles.container}>
        <div>
          <Title
            text={rounds === 0 ? "🌸 終了 🌸" : "🌸 " + title + " 🌸"}
          ></Title>
        </div>

        <h2 className={styles.score}>
          {gameState.score}/{state.rounds}
        </h2>
        <div className={styles.flashcard}>
          <div className={styles.characterStage}>
            <h1 className={styles.character}>{state.kanji}</h1>
          </div>
          <div
            className={
              gameState.correct
                ? styles.correctMessage
                : styles.incorrectMessage
            }
            hidden={gameState.correct || gameState.incorrect ? false : true}
          >
            <h2>{gameState.correct ? `正解!` : state.yomikata}</h2>
          </div>

          <h2 className={rounds === 0 ? styles.gameOver : styles.gameOngoing}>
            {rounds === 0
              ? `Score: ${(gameState.score / state.rounds) * 100}%`
              : ""}
          </h2>
          <div className={styles.responsesContainer}>
            {answersOptions.map((ans, i) => {
              return (
                <Button
                  style={{ color: "black" }}
                  className={styles.answerButton}
                  colorScheme={
                    gameState.correct
                      ? "green"
                      : "none" && gameState.incorrect
                      ? "red"
                      : "none"
                  }
                  onClick={() => {
                    gameDispatch({ type: "select" });
                    handleResults(ans, i);
                  }}
                  key={ans}
                  disabled={
                    gameState.correct || gameState.incorrect || rounds === 0
                      ? true
                      : false
                  }
                >
                  {ans}
                </Button>
              );
            })}
          </div>

          <Button
            disabled={rounds === 0 ? true : false}
            display={gameState.submit ? true : "none"}
            style={{
              color: "black",
              border: "1px solid var(--mid-shade)",
              margin: "10px",
              borderRadius: "30px",
              fontSize: "1.2em",
            }}
            onClick={() => {
              if (rounds > 0) {
                getRandomKanji();
                setRounds(rounds - 1);
                if (state.game === false) {
                  dispatch({ type: "start", set: catData, rounds: rounds });
                }
                // } else {
                //   dispatch({ type: "gameOver" });
                //   end(title);
                //
              }
            }}
          >
            {gameState.correct || gameState.incorrect ? "次へ" : "スキップ"}
          </Button>

          <Select
            placeholder="Rounds:"
            variant="outline"
            borderColor="var(--mid-shade)"
            color="black"
            isFullWidth="false"
            width="30vw"
            display={state.game ? "none" : true}
          >
            <option
              value="10"
              onClick={() => {
                setRounds(10);
              }}
            >
              10
            </option>
            <option
              value="20"
              onClick={() => {
                setRounds(20);
              }}
            >
              20
            </option>
            <option
              value="50"
              onClick={() => {
                setRounds(50);
              }}
            >
              50
            </option>
          </Select>

          <Button
            style={{
              border: "1px solid var(--mid-shade)",
              margin: "10px",
              borderRadius: "30px",
              fontSize: "1.2em",
              color: "black",
            }}
            display={state.game ? "none" : true}
            onClick={() => {
              getRandomKanji();
              if (state.game === false) {
                dispatch({ type: "start", set: catData, rounds: rounds });
                start();
              }
            }}
          >
            {state.game ? "" : "開始"}
          </Button>
        </div>
        <Link
          to={{
            pathname: "/results",
            state: { title: title, roundSet: gameState.roundSet },
          }}
        >
          <p className={styles.results}>results</p>
        </Link>
      </div>
    </>
  );
}

export default FlashcardPanel;
