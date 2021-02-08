import React, { useReducer } from "react";
import styles from "./App.module.css";
import Menu from "./menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FlashcardPanel from "../pages/flashcard";
import Results from "../pages/results";
import Login from "../pages/login";
import { useAuth0 } from "@auth0/auth0-react";

const initialGame = {
  title: "",
  questionSet: [],
  responseSet: [],
};

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error();
    case "setUpGame":
      return {
        ...state,
        title: "",
        roundSet: [],
      };

    case "setUpResults":
      return { ...state, title: action.title, questionSet: action.questionSet };
  }
}
function App() {
  const { isAuthenticated } = useAuth0();
  const [state, dispatch] = useReducer(reducer, initialGame);

  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/flashcardpanel/:title">
          <FlashcardPanel />
        </Route>
        <Route path="/results" component={Results} />

        <Route path="/">{isAuthenticated ? <Menu /> : <Login />}</Route>
      </Switch>
    </div>
  );
}

export default App;
