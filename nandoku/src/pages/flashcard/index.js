import React, { useReducer, useEffect, useState } from "react";
import styles from "./index.module.css";
import Title from "../../components/heading";
import { useParams } from "react-router-dom";
import { categories } from "../../components/menu/categories";

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
    //start the game with score at 0 and gen first kanji q
    case "start":
      return {
        ...state,
        game: true,
        score: 0,
        kanji: action.value,
        yomi: action.answer,
      };
    //next kanji
    case "setKanji":
      return { ...state, kanji: action.value, yomi: action.answer };
  }
}

function FlashcardPanel({ kanji }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title } = useParams();
  const [catData, setCatData] = useState(false);
  // console.log("flashcard");
  // console.log({ kanji, title });

  useEffect(() => {
    setCatData(
      categories.find((categoryData) => categoryData.title === title).data
    );
  }, [catData, title]);

  function randomKanji(index) {
    let randomIndex = Math.floor(
      Math.random() * (catData.length - 1 - 0 + 1) + 0
    );
    // console.log({ randomIndex });
    // let randomKanji = kanji(index);
    // console.log({ randomKanji });
    // return randomKanji;
    console.log(catData[randomIndex]);
  }

  return (
    <div className={styles.container}>
      <Title text={title}></Title>
      <button
        id="our-button-comrade"
        onClick={randomKanji}
        style={{ marginRight: "10px" }}
      >
        random kanji
      </button>
      <button
        onClick={() => {
          dispatch({ type: "start", value: randomKanji() });
        }}
      >
        start
      </button>
      <button
        onClick={() => {
          dispatch({ type: "setKanji", value: randomKanji() });
        }}
      >
        generate
      </button>
    </div>
  );
}

export default FlashcardPanel;
