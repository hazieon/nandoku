import styles from "./App.module.css";
import Menu from "./menu";
// import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import FlashcardPanel from "../pages/flashcard";
// import Results from "../pages/results";
// import Login from "../pages/login";
// import { useAuth0 } from "@auth0/auth0-react";

function App() {
  // const { isAuthenticated } = useAuth0();
  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path="/flashcardpanel/:title">
          <FlashcardPanel />
        </Route>
        {/* <Route path="/results">
          <Results />
        </Route> */}
        <Route exact path="/">
          <Menu />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
//{isAuthenticated ? <Menu /> : <Login />}
