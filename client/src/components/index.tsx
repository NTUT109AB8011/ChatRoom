import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Chat from './Chat'
import Programming from './Chat/Programming'
import Math from './Chat/Math'
import Technology from './Chat/Technology'
import Lounge from './Chat/Lounge'
import Physics from './Chat/Physics'
import Menu from './Menu'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/chat" component={Chat} exact />
        <Route path="/menu" component={Menu} exact />
        <Route path="/chat/programming" component={Programming} exact />
        <Route path="/chat/math" component={Math} exact />
        <Route path="/chat/technology" component={Technology} exact />
        <Route path="/chat/lounge" component={Lounge} exact />
        <Route path="/chat/physics" component={Physics} exact />
      </Switch>
    </Router >
  )
}

export default App;
