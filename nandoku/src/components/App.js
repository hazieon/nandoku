import styles from "./App.module.css";
import Menu from "./menu";
import CatPanel from "./catPanel/";
import { ChakraProvider } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import FlashcardPanel from "../pages/flashcard";

function App() {
  return (
    <div className={styles.App}>
      <Route exact path="/flashcardpanel/:title">
        <FlashcardPanel />
      </Route>
      <Route exact path="/">
        <Menu />
      </Route>
    </div>
  );
}

export default App;
