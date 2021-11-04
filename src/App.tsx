import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './calendar/home';
import Login from './login/login';

function App() {
  return (
    <div id="root">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
