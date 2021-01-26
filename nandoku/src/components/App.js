import styles from "./App.module.css";
import Menu from "./menu";
import CatPanel from "./catPanel/";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FlashcardPanel from "../pages/flashcard";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Switch>
          <Route path="/FlashcardPanel">
            <FlashcardPanel />
          </Route>
          <Route path="/">
            <Menu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
