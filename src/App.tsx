import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/auth-provider';
import Home from './home/home';
import Login from './login/login';  

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;
