import ReactDOM from 'react-dom';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import { Home } from './calendar/home';
import { Login } from './login/login';

function onSuccessfulLogin(resp: GoogleLoginResponse | GoogleLoginResponseOffline) {
  const user = resp

  ReactDOM.render(
  <Redirect to="/home"/>,
  document.getElementById("root"))
}

function onFailedLogin(error: any) {
  console.log(error)

  return (<Redirect to="/"/>)
}

function App() {
  return (
    <div id="root">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login onFailureResponse={onFailedLogin} onSuccessResponse={onSuccessfulLogin}/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
