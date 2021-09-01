import NaveBar from "./components/NaveBar";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./components/Game";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <NaveBar />
            <Home />
          </Route>
          <Route path="/game" exact>
            <NaveBar />
            <Game />
          </Route>
          <Route path="/highscore" exact>
            <NaveBar />
            <Game />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
