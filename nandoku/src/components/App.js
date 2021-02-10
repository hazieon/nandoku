import styles from "./App.module.css";
import Menu from "./menu";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FlashcardPanel from "../pages/flashcard";
import Login from "../pages/login";
import { useAuth0 } from "@auth0/auth0-react";
import Results from "../pages/results";

function App() {
  const { isAuthenticated } = useAuth0();
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
