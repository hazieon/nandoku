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
  score: 0,
  kanji: "字",
  yomikata: "かんじ",
  kanjiSet: [],
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
    case "score":
      return {
        ...state,
        score: state.score + 1,
      };
  }
}

function FlashcardPanel({ kanji }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title } = useParams();
  const [catData, setCatData] = useState(false);
  const [answersOptions, setAnswersOptions] = useState([]);

  useEffect(() => {
    setCatData(
      categories.find((categoryData) => categoryData.title === title).data
    );
    // dispatch({ type: "start", set: catData });
    console.log({ state }, "loaded ");
  }, [catData, title]);
  console.log({ answersOptions });
  function randomKanji(index) {
    let randomIndex = Math.floor(
      Math.random() * (catData.length - 1 - 0 + 1) + 0
    );
    const randomKanji = catData[randomIndex];
    const answersArr = [
      catData[Math.floor(Math.random() * (catData.length - 1 - 0 + 1) + 0)]
        .yomi,
      catData[Math.floor(Math.random() * (catData.length - 1 - 0 + 1) + 0)]
        .yomi,
      catData[Math.floor(Math.random() * (catData.length - 1 - 0 + 1) + 0)]
        .yomi,
      randomKanji.yomi,
    ];
    //shuffle the answers array using an npm package method:
    shuffle(answersArr);
    setAnswersOptions(answersArr);

    dispatch({
      type: "setKanji",
      kanji: randomKanji.kanji,
      answer: randomKanji.yomi,
    });
    console.log({ state }, "random kanji");
  }

  //function to handle whether the chosen option was correct - runs on click
  function handleResults(ans) {
    if (ans === state.yomikata) {
      console.log("正解です！");
      //dispatch method updates the user's score +1 if they are correct
      dispatch({ type: "score" });
      console.log(state.score);
    } else {
      console.log("ばつ！");
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Title text={title}></Title>
      </div>
      <Button
        style={{ margin: "10px", borderRadius: "30px", fontSize: "1.7em" }}
        onClick={() => {
          dispatch({ type: "start", set: catData });
          console.log({ state }, "start");
        }}
      >
        start
      </Button>
      <h2>{state.score}</h2>
      <div className={styles.flashcard}>
        <div className={styles.characterStage}>
          <h1 className={styles.character}>{state.kanji}</h1>
        </div>
        {/* {catData.map((k, i) => {
          return <p>{k.yomi}</p>;
        })} */}

        {answersOptions.map((ans, i) => {
          return (
            <Button
              onClick={() => {
                handleResults(ans);
              }}
              key={ans}
            >
              {ans}
            </Button>
          );
        })}

        <Button
          style={{ margin: "10px", borderRadius: "30px", fontSize: "1.3em" }}
          onClick={() => {
            randomKanji();
          }}
        >
          generate
        </Button>
      </div>
    </div>
  );
}

export default FlashcardPanel;

// {/* <button
//       id="our-button-comrade"
//       onClick={randomKanji}
//       style={{ marginRight: "10px" }}
//     >
//       random kanji
//     </button> */}
