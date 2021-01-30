import React, { useReducer, useEffect, useState } from "react";
import styles from "./index.module.css";
import Title from "../../components/heading";
import { useParams } from "react-router-dom";
import { categories } from "../../components/menu/categories";
import { Button, Box, Text, Center, VStack } from "@chakra-ui/react";
const shuffle = require("shuffle-array");

// let title = "花";
// let kanji = [
//   { kanji: "薔薇", yomi: "ばら" },
//   { kanji: "躑躅", yomi: "つつじ" },
//   { kanji: "薊", yomi: "あざみ" },
//   { kanji: "蒲公英", yomi: "たんぽぽ" },
//   { kanji: "蘭", yomi: "らん" },
//   { kanji: "菫", yomi: "すみれ" },
//   { kanji: "鬱金香", yomi: "うっこんこう" },
//   { kanji: "紫陽花", yomi: "あじさい" },
//   { kanji: "菖蒲", yomi: "あやめ" },
//   { kanji: "花梨", yomi: "かりん" },
//   { kanji: "酸漿", yomi: "ほおずき" },
//   { kanji: "百合", yomi: "ゆり" },
//   { kanji: "秋桜", yomi: "こすもす" },
//   { kanji: "桔梗", yomi: "ききょう" },
//   { kanji: "百日紅", yomi: "さるすべり" },
//   { kanji: "水芭蕉", yomi: "みずばしょう" },
//   { kanji: "椿", yomi: "つばき" },
//   { kanji: "萩", yomi: "はぎ" },
//   { kanji: "向日葵", yomi: "ひまわり" },
//   { kanji: "撫子", yomi: "なでしこ" },
// ];

//bring in kanji as props
//on button press (start/next), display a random kanji from the array
//display random option answers from the array (or multi char input)
//show correct/incorrect on 'submit' (stretch:or time up)
//show 10 kanji per round, then show results

//useReducer state - initial text (category name kanji or some image)
//render random index of kanji array and 4 potential answers

const initialState = {
  game: false,
  kanji: "字",
  yomikata: "かんじ",
  kanjiSet: [],
};

const gameInitialState = {
  score: 0,
  correct: false,
  incorrect: false,
  roundSet: [], //kanji in here should not be added again as randomKanji.yomi
  rounds: 0, //up to 10 max (or customise later); if rounds <10 'next', else results
  // submit: false, //true if data for that q has been submitted - use to disable buttons
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
        score: 0,
        kanjiSet: action.set,
      };
    //next kanji
    case "setKanji":
      return {
        ...state,
        kanji: action.kanji,
        yomikata: action.answer,
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
        rounds: 0,
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
        rounds: state.rounds + 1,
        submit: false,
        //build an array of kanji that have been asked already
        // !!! need to check this with .includes before setting question
        // need to call this upon each generation of a randomKanji in func
        roundSet: [...state.roundSet, action.usedKanji],
      };
    default:
      throw new Error();
  }
}

function FlashcardPanel({ kanji }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);
  const { title } = useParams();
  const [catData, setCatData] = useState(false);
  const [answersOptions, setAnswersOptions] = useState([]);
  const [correct, setCorrect] = useState(null);

  useEffect(() => {
    setCatData(
      categories.find((categoryData) => categoryData.title === title).data
    );
    console.log({ state }, "loaded ");
  }, [catData, title]);

  //function to generate a random kanji, set the answers array, shuffle and set state
  function getRandomKanji() {
    if (gameState.rounds < 10) {
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
        while (answersArr.length < 4) {
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
        // const answersArr = [
        //   catData[Math.floor(Math.random() * (catData.length - 1 - 0 + 1) + 0)]
        //     .yomi,
        //   catData[Math.floor(Math.random() * (catData.length - 1 - 0 + 1) + 0)]
        //     .yomi,
        //   catData[Math.floor(Math.random() * (catData.length - 1 - 0 + 1) + 0)]
        //     .yomi,
        //   randomKanji.yomi,
        // ];
        //shuffle the answers array using an npm package method:
        shuffle(answersArr);
        setAnswersOptions(answersArr);
      }
    } else {
      console.log("game over!", "score:", gameState.score, gameState.roundSet);
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
    <div className={styles.container}>
      {/* <div>
        <Title text={title}></Title>
      </div> */}
      <Button
        style={{ margin: "15px", borderRadius: "30px", fontSize: "3rem" }}
        onClick={() => {
          getRandomKanji();
          dispatch({ type: "start", set: catData });
          gameDispatch({ type: "start" });
          console.log({ state }, "start");
        }}
      >
        {title}
      </Button>
      <h2>{gameState.score}</h2>
      <div className={styles.flashcard}>
        <div className={styles.characterStage}>
          <h1 className={styles.character}>{state.kanji}</h1>
        </div>
        <div className={styles.responsesContainer}>
          {answersOptions.map((ans, i) => {
            return (
              <Button
                className={styles.answerButton}
                colorScheme={
                  gameState.correct
                    ? "green"
                    : "none" && gameState.incorrect
                    ? "red"
                    : "none"
                }
                onClick={() => {
                  handleResults(ans, i);
                }}
                key={ans}
                disabled={
                  gameState.correct
                    ? true
                    : false || gameState.incorrect
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
          style={{ margin: "10px", borderRadius: "30px", fontSize: "1.2em" }}
          onClick={() => {
            getRandomKanji();
            console.log("generate", gameState, state);
          }}
        >
          {gameState.correct || gameState.incorrect ? "次" : "submit"}
        </Button>
      </div>
    </div>
  );
}

export default FlashcardPanel;

// //asynchronous useEffect to call dispatch functions when random kanji is set
// useEffect(() => {
//   console.log(randomKanji, "random kanji not in set, useEffect ran");
//   //dispatch to set states of 'correct' and add to 'used kanji' array to track questions:
//   gameDispatch({ type: "nextQuestion", usedKanji: randomKanji.kanji });
//   //dispatch to set the current round's kanji:
//   dispatch({
//     type: "setKanji",
//     kanji: randomKanji.kanji,
//     answer: randomKanji.yomi,
//   });
// }, [randomKanji]);

// {/* <button
//       id="our-button-comrade"
//       onClick={randomKanji}
//       style={{ marginRight: "10px" }}
//     >
//       random kanji
//     </button> */}
