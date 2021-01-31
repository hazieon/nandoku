import { flowers } from "./flowers";
import { birds } from "./birds";
import { insects } from "./insects";
import { colours } from "./colours";
import { weather } from "./weather";
import { general } from "./general";
const categories = [
  {
    data: general,
    title: "一般",
    myClass: "cat general",
    score: 0,
  },
  {
    data: flowers,
    title: "花",
    myClass: "cat flowers",
    score: 0,
  },
  {
    data: birds,
    title: "鳥類",
    myClass: "cat birds",
    score: 0,
  },
  {
    data: colours,
    title: "色",
    myClass: "cat colours",
    score: 0,
  },
  {
    data: weather,
    title: "天気",
    myClass: "cat weather",
    score: 0,
  },
  {
    data: insects,
    title: "昆虫",
    myClass: "cat insects",
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

//categories to create:
//fish/sea creatures 魚類 魚へん, countries, random mix button
