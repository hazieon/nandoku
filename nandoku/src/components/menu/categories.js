import { flowers } from "./flowers";

const categories = [
  {
    link: { path: "/FlashcardPanel", data: flowers },
    title: "花",
    myClass: "cat flowers",
    score: 0,
  },
  {
    link: "/",
    title: "鳥類",
    myClass: "cat birds",
    score: 0,
  },
  {
    link: "/",
    title: "色",
    myClass: "cat colours",
    score: 0,
  },
  {
    link: "/",
    title: "天気",
    myClass: "cat weather",
    score: 0,
  },
  {
    link: "/",
    title: "国名",
    myClass: "cat countries",
    score: 0,
  },
  {
    link: "/",
    title: "魚へん",
    myClass: "cat fish",
    score: 0,
  },
];

// {
//     link:"/",
//     title:"",
//     myClass: "cat flowers",
//     score: 0,
//   },

export { categories };
