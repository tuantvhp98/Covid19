import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from './components/home';
import Footer from './components/footer';
import NotFound from './components/notfound';

const MenuLink = ({ label, to, activeExtract }) => {
  return (
    <Route path={to} exact={activeExtract} children={({ match }) => {
      let active = match ? 'active' : '';
      return (
        <li className={`my-li ${active}`}>
          <Link className="my-link" to={to}>{label}</Link>
        </li>
      )
    }}

    />
  )
}
function App() {
  return (
    <Router>
      <ul className="nav-bar">
        <MenuLink to="/" label="Home" />
      </ul>
      <Switch>
        {/* <Redirect exact from="/" to="/" /> */}
        <Route path="/" component={Home}></Route>
        {/* <Route component={NotFound}></Route> */}
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
